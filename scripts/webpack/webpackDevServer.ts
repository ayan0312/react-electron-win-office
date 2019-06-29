import Koa from 'koa';
import webpack from 'webpack';

import koaWebpackDevMiddleware from './utils/koaWebpackDevMiddleware';
import koaWebpackHotMiddleware from './utils/koaWebpackHotMiddleware';
import webpackClientConfig from './webpackConfigRenderer';

export default (app: Koa) => {
    (webpackClientConfig.entry as any).renderer = ['webpack-hot-middleware/client'].concat(
        (webpackClientConfig.entry as any).renderer,
    );
    (webpackClientConfig.entry as any).vendor = ['react-hot-loader/patch'].concat(
        (webpackClientConfig.entry as any).vendor,
    );

    if (webpackClientConfig.plugins === undefined) {
        webpackClientConfig.plugins = [];
    }

    webpackClientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    );
    const clientCompiler = webpack(webpackClientConfig);
    const { output } = webpackClientConfig;
    if (output !== undefined && output.publicPath !== undefined) {
        const devMiddlewareOptions = {
            publicPath: output.publicPath,
            stats: {
                chunks: false,
                colors: true,
            },
        };

        app.use(koaWebpackDevMiddleware(clientCompiler, devMiddlewareOptions));
        app.use(koaWebpackHotMiddleware(clientCompiler));
    } else {
        return false;
    }
};
