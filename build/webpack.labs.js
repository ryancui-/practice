const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { prod, node_env } = require('./env');

const config = {
  entry: {
    labs: path.resolve(__dirname, '../src/labs/labs-entry.js'),
  },
  mode: node_env,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: prod ? MiniCssExtractPlugin.loader : 'style-loader'
      }, {
        loader: 'css-loader'
      }]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'labs.html',
      template: path.resolve(__dirname, '../src/labs/labs.html'),
      chunks: ['labs']
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    hot: true,
    port: 2333,
    clientLogLevel: 'none',
    stats: 'minimal'
  },
  devtool: prod ? false : 'eval-source-map'
};

if (prod) {
  config.plugins.push(new MiniCssExtractPlugin({
    filename: 'css/[name].[hash].css'
  }));
}

module.exports = config;
