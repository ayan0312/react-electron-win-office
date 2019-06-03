const path = require('path')
const merge = require('webpack-merge')
const base = require('../base.config')
const config = require('../config')

let output = merge(base, {
    mode: 'production',
    target: 'electron-renderer',
    entry:config.electron.path.entry,
    output: {
        path: config.electron.path.output,
        filename: '[name].min.js',
        library: '[name]',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        publicPath: '/'
    }
})

module.exports = output
