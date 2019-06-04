import dotenv from 'dotenv'
dotenv.config()

import path from 'path'
import webpack from 'webpack'
import TerserPlugin from 'terser-webpack-plugin'
import Dotenv from 'dotenv-webpack'

import paths from './utils/paths'
import env from './utils/env'

const rules = []
rules.push({
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
        cacheDirectory: env.isDev
    }
})

const plugins = []
plugins.push(
    new webpack.NamedModulesPlugin(),
    new Dotenv({
        safe: true,
        systemvars: true
    })
)

const webpackConfig = {
    mode: env.isDev ? 'development' : 'production',
    target: 'electron-main',
    devtool: 'source-map',
    output: {
        path: paths.buildPath,
        filename: 'main.js'
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                sourceMap: true,
                cache: true
            })
        ]
    },
    entry: path.resolve(paths.mainPath, 'index.js'),
    plugins,
    resolve: {
        modules: [
            'node_modules',
            paths.srcPath,
            paths.mainPath
        ]
    },
    module: {
        rules
    },
    cache: env.isDev,
    stats: 'minimal',
    node: {
        __dirname: false,
        __filename: false
    }
}

export default webpackConfig