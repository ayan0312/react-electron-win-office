const prod = require('./prod.config.js')
const merge = require('webpack-merge')

const output = merge(prod,{
    target: 'electron-renderer',
})

module.exports = output
