import chalk from 'chalk'
import config from './config'

function* id() {
    let id = 0
    while (true) {
        yield ++id
    }
}

const scssId = id()

export function logStats(proc: string, data: any) {
    let log: string = ''

    const logs1: Array<any> = []
    const logs2: Array<any> = []
    logs1.length = 19 - proc.length + 1
    logs2.length = 28 + 1

    const startLog = chalk.yellow.bold(`┏ ${proc} Process ${logs1.join('-')}`)
    console.log(startLog)

    if (config.build.minimal) {
        log += chalk.white.bold('  finished')
    } else if (typeof data === 'object') {
        data
            .toString({
                colors: true,
                chunks: false,
            })
            .split(/\r?\n/)
            .forEach((line: string) => {
                if (line.indexOf('mini-css-extract-plugin') !== -1) return

                cleanUpImpurity(line)
            })
    } else {
        log += `${data}`
    }

    const endLog = `${log}\n${chalk.yellow.bold(`┗ ${logs2.join('-')}`)}\n`
    console.log(endLog)
}

function cleanUpImpurity(line: string) {
    const impurity = [
        line.indexOf('node_modules')
    ]

    if (impurity.includes(-1)) {
        console.log(`  ${line}`)
    } else {
        let newLine = onlySrcInfo(line)
        if (newLine) console.log(`${newLine}`)
    }
}

function onlySrcInfo(line: string) {
    const srcIndex = (str: string) => str.indexOf('src/renderer')
    let linePathInfo = line
        .split('./node_modules')
        .map((line: string) => {
            if (srcIndex(line) !== -1) {
                let str = line.split('src/renderer')
                return `./src/renderer${str[1]}`
            } else {
                return ''
            }
        }).join('')
    return srcIndex(linePathInfo) === -1 ? false : `  ${chalk.white.bold(`[${scssId.next().value}]`)} ${linePathInfo}`
}

export function greeting(message: string = '') {
    console.log(chalk.yellow.bold(`\n  ${message}\n\n`))
}
