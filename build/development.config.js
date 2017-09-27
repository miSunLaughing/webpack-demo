const path = require('path');
const config = require('config');
const root = path.resolve(__dirname, '..');// 项目的根目录绝对路径
const webpack = require('webpack');
const filePath = path.join(root, 'app/index.js');//入口文件
const HtmlWebpackPlugin = require('html-webpack-plugin');  // html打包插件
// const TransferWebpackPlugin = require('transfer-webpack-plugin');  // 仅仅是copy文件
var OpenBrowserPlugin = require('open-browser-webpack-plugin');  // 打开浏览器插件 

module.exports = {
  entry: [
    './build/dev-client',
    filePath
  ],  // 入口文件路径
  output: {
    path: path.join(root, '../dist'),
    publicPath: '/',   //公共路径
    filename: 'app.js'  // 出口文件名
  },
  resolve: {
    alias: { // 配置目录或者模块对应的映射
      // 在任意目录下require('components/example') 相当于require('项目根目录/src/components/example')
      config: path.join(root, 'config')
    },
    extensions: ['.js', '.json'] // 引用js和json文件可以省略后缀名
    
  },
  module: { // 配置loader
    loaders: [
      {test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),//webpack 热更新插件
    new HtmlWebpackPlugin({
        filename: 'index.html',    // 生成的文件名
        template: path.resolve(__dirname, '../app/index.html')  // 模板是app/index.html
    }),
    new OpenBrowserPlugin({  //自动打开页面调试地址
      url: `http://localhost:${config.ports.dev}`
    })
  ]
};