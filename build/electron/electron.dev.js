const path = require('path')
const merge = require('webpack-merge')
const base = require('../base.config')
const config = require('../config')

let output = merge(base, {
    mode: 'development',
    target: 'electron-renderer',
    entry:config.electron.path.entry,
    output: {
        path: config.electron.path.output,
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        publicPath: '/'
    },
    devServer: {
        port:config.electron.server.port,
        compress: true,
        contentBase: config.electron.path.output,
        clientLogLevel: 'none',
        quiet: false,
        open: false,
        historyApiFallback: {
            disableDotRule: true
        },
        watchOptions: {
            ignored: /node_modules/
        }
    }
})

module.exports = output