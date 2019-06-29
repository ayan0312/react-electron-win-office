import Koa from 'koa';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

export default (compiler: webpack.Compiler, opts?: webpackDevMiddleware.Options) => {
    const devMiddleware = webpackDevMiddleware(compiler, opts);
    const koaMiddleware = (ctx: Koa.Context, next: () => Promise<any>): any => {
        const res: any = {};
        res.end = (data?: any): void => {
            ctx.body = data;
        };
        res.setHeader = (name: string, value: string | string[]) => {
            ctx.headers[name] = value;
            if (name === 'Content-Type' && typeof value === 'string') {
                ctx.type = value;
            }
        };
        return devMiddleware(ctx.req, res, next);
    };
    Object.keys(devMiddleware).forEach(p => {
        (koaMiddleware as any)[p] = (devMiddleware as any)[p];
    });
    return koaMiddleware;
};
