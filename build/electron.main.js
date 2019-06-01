const path = require('path');
const paths = require('./utils/paths')

module.exports = {

    mode: process.env.NODE_ENV,

    bail: true,

    devtool: 'source-map',

    entry: path.resolve(paths.mainPath,'index.js'),

    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: '[name].min.js',
        library: '[name]',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        publicPath: '/'
    },

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.scss']
    },

    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            compact: true
                        }
                    }
                ]
            }
        ]
    }
}