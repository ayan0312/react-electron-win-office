import Koa from 'koa';
import KoaFavicon from 'koa-favicon';
import KoaRouter from 'koa-router';
import path from 'path';

import paths from './utils/paths';
import WebpackDevServer from './webpack/webpackDevServer';

const app = new Koa();
const router = new KoaRouter();

router.get('/*', (ctx: Koa.Context, next) => {
    ctx.type = 'html';
    ctx.body = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>react-fluent-design</title>
                    <link href="/assets/renderer.css" rel="stylesheet" type="text/css">
                </head>
                <body>
                    <div id="root"></div>
                    <script src="/assets/renderer.js"></script>
                    <script src="/assets/vendor.js"></script>
                </body>
            </html>
            `;
    next();
});

WebpackDevServer(app);

app.use(KoaFavicon(path.resolve(paths.rootPath, './resources/icon.ico')));

app.use(router.routes()).use(router.allowedMethods());

app.listen(1212, () => {
    console.log('Koa App Started At Port 1212!');
});
