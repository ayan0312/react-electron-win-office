import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import paths from './utils/paths'
import env from './utils/env'

const getStyleLoaders = loaders => {
    return [
        env.isDev ? 'style-loader' : MiniCssExtractPlugin.loader
    ].concat(loaders)
}

const rules = []
rules.push({
    test: /\.tsx?$/,
    loader: "ts-loader",
    exclude: /node_modules/
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
                localIdentName: env.isDev
                    ? '[name]-[local]-[hash:base64:5]'
                    : '[hash:base64:5]'
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    require('autoprefixer')
                ]
            }
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: env.isDev
            }
        }
    ])
})

rules.push({
    test: /\.css/,
    use: getStyleLoaders([
        {
            loader: 'css-loader',
            options: {
                sourceMap: env.isDev

            }
        }
    ])
})

rules.push({
    test: /\.svg$/,
    loader: 'svg-inline-loader'
})

rules.push({
    test: /\.(ico|jpg|jpeg|png|gif)(\?.*)?$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: env.isDev ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]'
            }
        }
    ]
})

rules.push({
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    use: {
        loader: 'url-loader',
        options: {
            limit: 10000
        }
    }
})

let plugins = [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, '../src/renderer/index.html'),
        minify: {
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true
        },
        nodeModules: process.env.NODE_ENV !== 'production'
            ? path.resolve(__dirname, '../node_modules')
            : false
    }),
]

if (env.isDev) {
    plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    )
}

if (env.isProd) {
    plugins.push(
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    )
}

const webpackConfig = {
    mode: env.isDev ? 'development' : 'production',
    target: 'electron-renderer',
    devtool: env.isDev ? 'inline-source-map' : 'source-map',
    entry: {
        renderer: path.resolve(paths.rendererPath, 'index.tsx')
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../dist')
    },
    plugins,
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            '@': path.join(__dirname, '../src/renderer')
        }
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