const path = require('path')
const merge = require('webpack-merge')
const base = require('../base.config')
const config = require('../config')

let output = merge(base, {
    mode: 'production',
    devtool: 'source-map',
    entry: config.web.path.entry,
    output: {
        path: config.web.path.output,
        filename: '[name].min.js',
        library: '[name]',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        publicPath: '/'
    },
})

module.exports = output