const path = require('path')
const merge = require('webpack-merge')
const base = require('../base.config')
const config = require('../config')

let output = merge(base, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: config.web.path.entry,
    output: {
        path: config.web.path.output,
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        publicPath: '/'
    },
    devServer: {
        port:config.web.server.port,
        compress: true,
        contentBase: config.web.path.output,
        clientLogLevel: 'none',
        quiet: false,
        open: true,
        historyApiFallback: {
            disableDotRule: true
        },
        watchOptions: {
            ignored: /node_modules/
        }
    }
})

module.exports = output