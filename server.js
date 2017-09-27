const express = require('express');
const path = require('path');
const config = require('config');

const app = express();

// 配置站点静态文件
app.use(express.static(path.join(__dirname,'./dist')));
app.set('port', config.ports.server);






app.listen(app.get('port'), function(){
	console.log('webpack-demo server is listening at 127.0.0.1:'+app.get('port'));
});