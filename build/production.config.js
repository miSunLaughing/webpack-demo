const path = require('path');
const config = require('config');
const root = path.resolve(__dirname, '../'); // 项目的根目录绝对路径
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
  entry: path.join(root, 'app/index.js'),  // 入口文件
  output: {
    path: path.join(root, '/dist'),  // 输出目录
    publicPath: '/',    // 公共路径
    filename: 'app.js'  // 出口文件名
  },
  resolve: {
    alias: { // 配置目录别名
      // 在任意目录下require('components/example') 相当于require('项目根目录/src/components/example')
      config: path.join(root, 'config')
    },
    extensions: ['.js', '.json'] // 引用js和vue文件可以省略后缀名
  },
  module: { // 配置loader
    loaders: [
      {test: /\.css$/, use: 'css-loader'}, 
      // {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/} // .js文件使用babel-loader，切记排除node_modules目录
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          filename: 'index.html',
          template: path.resolve(__dirname, '../app/index.html')
      }),
      new Visualizer()
  ]
};