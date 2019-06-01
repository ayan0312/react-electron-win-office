const prod = require('./prod.config.js')
const merge = require('webpack-merge')

const output = merge(prod,{
    
})

module.exports = output
