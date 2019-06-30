import chalk from 'chalk'

export function logStats(proc: string, data: any) {
    let log: string = ''

    const logs1: Array<any> = []
    const logs2: Array<any> = []
    logs1.length = 19 - proc.length + 1
    logs2.length = 28 + 1

    log += chalk.yellow.bold(`┏ ${proc} Process ${logs1.join('-')}`)
    log += '\n\n'

    if (typeof data === 'object') {
        data.toString({
            colors: true,
            chunks: false,
        })
            .split(/\r?\n/)
            .forEach((line: string) => {
                log += `  ${line} \n`
            })
    } else {
        log += `  ${data}\n`
    }

    log += `\n${chalk.yellow.bold(`┗ ${logs2.join('-')}`)}\n`

    console.log(log)
}

export function greeting() {
    console.log(chalk.yellow.bold('\n  Pomodoro'))
    console.log(`${chalk.blue('  getting ready...')}\n`)
}
