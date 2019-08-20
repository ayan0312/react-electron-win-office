import path from 'path'
import webpack from 'webpack'
import electron from 'electron'
import chalk from 'chalk'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'

import WebpackDevServer from 'webpack-dev-server'
import webpackHotMiddleware from 'webpack-hot-middleware'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import paths from './utils/paths'
import { logStats, greeting } from './utils/log'

import webpackConfigMain from './webpack/webpackConfigMain'
import webpackClientConfig from './webpack/webpackDevConfig'

let electronProcess: ChildProcessWithoutNullStreams | null = null
let manualRestart: boolean = false
let hotMiddleware: webpackHotMiddleware.EventStream

function startRenderer() {
    return new Promise((resolve, reject) => {
        if (webpackClientConfig.plugins === undefined) {
            webpackClientConfig.plugins = []
        }

        webpackClientConfig.plugins.push(
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(paths.rendererPath, 'index.html'),
                minify: {
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                },
                nodeModules: path.resolve(paths.rootPath, './node_modules'),
            }),
        )

        const compiler = webpack(webpackClientConfig)
        hotMiddleware = webpackHotMiddleware(compiler, {
            log: false,
            heartbeat: 2500,
        })

        compiler.hooks.done.tap('done', stats => {
            logStats('Main', stats)
        })

        const server = new WebpackDevServer(compiler, {
            contentBase: paths.rootPath,
            quiet: true,
            before(app: any, ctx: any) {
                app.use(hotMiddleware)
                ctx.middleware.waitUntilValid(() => {
                    resolve()
                })
            },
        })

        server.listen(1212)
    })
}

export function startMain() {
    return new Promise((resolve, reject) => {
        const compiler = webpack(webpackConfigMain)

        compiler.hooks.watchRun.tapAsync('watch-run', (compilation: any, done: any) => {
            logStats('Main', chalk.white.bold('compiling...'))
            done()
        })

        compiler.watch({}, (err: any, stats: any) => {
            if (err) {
                console.log(err)
                return
            }

            logStats('Main', stats)

            if (electronProcess && electronProcess.kill) {
                manualRestart = true
                process.kill(electronProcess.pid)
                electronProcess = null
                startElectron()

                setTimeout(() => {
                    manualRestart = false
                }, 5000)
            }

            resolve()
        })
    })
}

export function startElectron() {
    const args = ['--inspect=5858', path.resolve(paths.rootPath, '../electron/dist/main.js')]

    electronProcess = spawn(String(electron), args)

    electronProcess.stdout.on('data', data => {
        electronLog(data, 'blue')
    })
    electronProcess.stderr.on('data', data => {
        electronLog(data, 'red')
    })

    electronProcess.on('close', () => {
        if (!manualRestart) process.exit()
    })
}

function electronLog(data: any, color: string) {
    let log: string = ''
    const currentData = data.toString().split(/\r?\n/)
    currentData.forEach((line: string) => {
        log += `  ${line}\n`
    })
    if (/[0-9A-z]+/.test(log)) {
        if (color === 'red' || color === 'blue') {
            console.log(
                `${chalk[color].bold('┏ Electron -------------------')}\n\n${log}${chalk[
                    color
                ].bold('┗ ----------------------------')}\n`,
            )
        }
    }
}

function init() {
    greeting()

    Promise.all([startRenderer(), startMain()])
        .then(() => {
            startElectron()
        })
        .catch(err => {
            console.error(err)
        })
}

init()
