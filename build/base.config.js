const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
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
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                            config: {
                                path: path.join(__dirname, 'postcss.config.js')
                            }
                        }
                    },
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|jpg|ttf)$/,
                loader: 'url-loader',
                options: {
                    'limit': 40000
                }
            },
            {
                test:/\.(ttf|woff)$/,
                loader: 'file-loader'
            },
            {
                test: /\.art$/,
                loader: 'art-template-loader'
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].min.css'
        })
    ]

};
