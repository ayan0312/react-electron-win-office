import Koa from 'koa';
import stream from 'stream';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';

export default (compiler: webpack.Compiler, opts?: webpackHotMiddleware.Options) => {
    const hotMiddleware = webpackHotMiddleware(compiler, opts);

    return (ctx: Koa.Context, next: () => Promise<any>): any => {
        const streamer = new stream.PassThrough();
        ctx.body = streamer;
        const res: any = {};
        res.write = streamer.write.bind(streamer);
        res.writeHead = (state: number, headers?: any) => {
            ctx.state = state;
            ctx.set(headers);
        };
        return hotMiddleware(ctx.req, res, next);
    };
};
