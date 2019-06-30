export default (config: any) => {
    const configuration = {
        basePath: '.',
        frameworks: ['mocha', 'chai', 'karma-typescript'],
        preprocessors: {
            '**/*.ts': 'karma-typescript', // *.tsx for React Jsx
            '**/*.tsx': 'karma-typescript', // *.tsx for React Jsx
        },
        files: [
            {
                pattern: 'dist/**/*.@(mjs|js)',
                included: false,
            },
            {
                pattern: 'src/**/*.ts',
                type: 'js',
            },
            {
                pattern: 'test/**/*.ts',
                type: 'js',
            },
            {
                pattern: 'test/**/*.tsx',
                type: 'js',
            },
        ],
        reporters: ['coverage', 'karma-typescript'],
        browsers: (() => {
            if (process.env.BROWSER) {
                return [process.env.BROWSER]
            }
            return ['ChromeHeadless']
        })(),
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: true,
        concurrency: Infinity,

        karmaTypescriptConfig: {
            tsconfig: './tsconfig.json',
            compilerOptions: {
                module: 'commonjs',
                target: 'ES5',
            },
        },
    }

    config.set(configuration)
}
