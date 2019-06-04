import dotenv from 'dotenv'
dotenv.config()

import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import Dotenv from 'dotenv-webpack'

import paths from './utils/paths'
import env from './utils/env'

const getStyleLoaders = loaders => {
	return [
	  env.isDev ? 'style-loader' : MiniCssExtractPlugin.loader
	].concat(loaders)
  }

const port = process.env.PORT || 1212

const rules = []
rules.push({
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
        cacheDirectory: env.isDev
    }
})

rules.push({
    test: /\.scss/,
    use: getStyleLoaders([
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
                minimize: true,
                sourceMap: true
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
        'sass-loader'
    ])
})

rules.push({
    test: /\.css/,
    use:getStyleLoaders([
        {
            loader: 'css-loader',
            options: {
                sourceMap: env.isDev
            }
        }
    ])
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
    test: /\.art$/,
    loader: 'art-template-loader'
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
        template: path.resolve(paths.rendererPath, 'index.html'),
		inject: true,
		minify: env.isProd ? {
		collapseWhitespace: true,
		removeComments: true,
		removeRedundantAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
		useShortDoctype: true
		} : false
    }),
    new Dotenv({
        safe: true,
        systemvars: true
    })
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

const output = env.isDev ? {
    filename: 'renderer.js'
} : {
    path: paths.buildPath,
    publicPath: './',
    filename: 'renderer.js'
}
  
const entry = env.isDev ? [
    `webpack-dev-server/client?http://localhost:${port}/`,
    'webpack/hot/only-dev-server',
    require.resolve('../src/renderer/index')
] : path.resolve(paths.rendererPath, 'index')

const webpackConfig = {
    mode: env.isDev ? 'development' : 'production',
    target: 'electron-renderer',
    devtool: env.isDev ? 'inline-source-map' : 'source-map',
    entry,
    output,
    plugins,
    resolve: {
        modules: [
            'node_modules',
            paths.srcPath,
            paths.rendererPath
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

if (env.isDev) {
    webpackConfig.devServer = {
        port: port,
        historyApiFallback: {
            verbose: true,
            disableDotRule: false
        },
        compress: true,
        hot: true,
		open: false,
		stats: 'minimal',
        contentBase: paths.buildPath
    }
}

export default webpackConfig