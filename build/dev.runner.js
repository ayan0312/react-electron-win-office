const prod = require('./prod.config.js')
const merge = require('webpack-merge')

process.env.NODE_ENV = "development"

const output = merge(prod,{
    mode: process.env.NODE_ENV,
    devtool: 'cheap-module-source-map',
    devServer: {
        compress: true,
        contentBase: path.resolve(__dirname, '..', 'dist'),
        clientLogLevel: 'none',
        quiet: false,
        open: true,
        historyApiFallback: {
            disableDotRule: true
        },
        watchOptions: {
            ignored: /node_modules/
        }
    },
})
