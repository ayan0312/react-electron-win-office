import path from 'path';
import webpack from 'webpack';
import electron from 'electron';

import chalk from 'chalk';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

import paths from './utils/paths';
import { logStats } from './utils/log';
import webpackConfigMain from './webpack/webpackConfigMain';

let electronProcess: ChildProcessWithoutNullStreams | null = null;
let manualRestart: boolean = false;

export function startMain() {
    return new Promise((resolve, reject) => {
        const compiler = webpack(webpackConfigMain);

        compiler.hooks.watchRun.tapAsync('watch-run', (compilation: any, done: any) => {
            logStats('Main', chalk.white.bold('compiling...'));
            done();
        });

        compiler.watch({}, (err: any, stats: any) => {
            if (err) {
                console.log(err);
                return;
            }

            logStats('Main', stats);

            if (electronProcess && electronProcess.kill) {
                manualRestart = true;
                process.kill(electronProcess.pid);
                electronProcess = null;
                startElectron();

                setTimeout(() => {
                    manualRestart = false;
                }, 5000);
            }

            resolve();
        });
    });
}

export function startElectron() {
    const args = ['--inspect=5858', path.resolve(paths.rootPath, './dist/main.js')];

    electronProcess = spawn(String(electron), args);

    electronProcess.stdout.on('data', data => {
        electronLog(data, 'blue');
    });
    electronProcess.stderr.on('data', data => {
        electronLog(data, 'red');
    });

    electronProcess.on('close', () => {
        if (!manualRestart) process.exit();
    });
}

function electronLog(data: any, color: string) {
    let log: string = '';
    const currentData = data.toString().split(/\r?\n/);
    currentData.forEach((line: string) => {
        log += `  ${line}\n`;
    });
    if (/[0-9A-z]+/.test(log)) {
        if (color === 'red' || color === 'blue') {
            console.log(
                `${chalk[color].bold('┏ Electron -------------------')}\n\n${log}${chalk[
                    color
                ].bold('┗ ----------------------------')}\n`,
            );
        }
    }
}

startMain().then(() => {
    startElectron();
});
