import webpack from 'webpack'
import webpackClientConfig from './webpackConfigRenderer'

{
    ;(webpackClientConfig.entry as any).renderer = ['webpack-hot-middleware/client'].concat(
        (webpackClientConfig.entry as any).renderer,
    )
}

{
    ;(webpackClientConfig.entry as any).vendor = [
        'react',
        'react-dom',
        'react-redux',
        'react-router',
    ]
}

{
    ;(webpackClientConfig.entry as any).vendor = ['react-hot-loader/patch'].concat(
        (webpackClientConfig.entry as any).vendor,
    )
}

if (webpackClientConfig.plugins === undefined) {
    webpackClientConfig.plugins = []
}

webpackClientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
)

export default webpackClientConfig
