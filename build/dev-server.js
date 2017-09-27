 const express = require('express');
const webpack = require("webpack");
const path = require('path');
const config = require('config');
// 引入配置文件
const configuration = require('./development.config.js');
const compiler = webpack(configuration);

const serverOptions = {
    publicPath: '/',    // 官网的解释是将中间件绑定到服务器的路径  实践证明这就是打包后存在内存中的文件地址
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true }
};
const app = new express();
// 打包到内存中
app.use(express.static(path.join(__dirname,'../')));
app.use(require('webpack-dev-middleware')(compiler, serverOptions));
// app.use(require('webpack-dev-middleware')(compiler));


const hotMiddleware = require('webpack-hot-middleware')(compiler)
// webpack插件，监听html文件改变事件
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // 发布事件
        hotMiddleware.publish({ action: 'reload' });
        cb();
    });
});
app.use(hotMiddleware);
app.listen(config.ports.dev, function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log('Webpack-dev development server listening on port %s', config.ports.dev);
    }
});

