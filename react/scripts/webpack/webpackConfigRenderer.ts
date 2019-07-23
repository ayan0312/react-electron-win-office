import path from 'path'
import webpack from 'webpack'

import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import paths from '../utils/paths'
import env from '../utils/env'

const getStyleLoaders = (loaders: any) => {
    return [env.isDev ? 'style-loader' : MiniCssExtractPlugin.loader].concat(loaders)
}

const rules: Array<any> = []

rules.push({
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /node_modules/,
})

rules.push({
    test: /\.scss/,
    include: paths.rendererPath,
    use: getStyleLoaders([
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
                sourceMap: env.isDev,
                modules: true,
                localIdentName: env.isDev ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: [require('autoprefixer')],
            },
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: env.isDev,
            },
        },
    ]),
})

rules.push({
    test: /\.css/,
    use: getStyleLoaders([
        {
            loader: 'css-loader',
            options: {
                sourceMap: env.isDev,
            },
        },
    ]),
})

rules.push({
    test: /\.svg$/,
    loader: 'svg-inline-loader',
})

rules.push({
    test: /\.(ico|jpg|jpeg|png|gif)(\?.*)?$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: env.isDev ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
            },
        },
    ],
})

rules.push({
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    use: {
        loader: 'url-loader',
        options: {
            limit: 10000,
        },
    },
})

const plugins: Array<any> = []

if (env.isProd) {
    plugins.push(
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(paths.rootPath, './src/renderer/index.html'),
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
            },
            nodeModules:
                process.env.NODE_ENV !== 'production'
                    ? path.resolve(paths.rootPath, './node_modules')
                    : false,
        }),
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    )
}

const webpackConfig: webpack.Configuration = {
    plugins,
    cache: false,
    mode: env.isDev ? 'development' : 'production',
    target: 'electron-renderer',
    devtool: env.isDev ? 'inline-source-map' : 'source-map',
    entry: {
        renderer: path.resolve(paths.rendererPath, './index.tsx'),
    },
    output: {
        path: path.resolve(paths.rootPath, '../electron/dist'),
        filename: '[name].js',
    },
    resolve: {
        alias: {
            '@': path.resolve(paths.rootPath, './src/renderer'),
        },
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
        rules,
    },
    stats: 'minimal',
    node: {
        __dirname: false,
        __filename: false,
    },
}

export default webpackConfig
