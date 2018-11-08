const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { prod, node_env } = require('./env');

const config = {
  entry: {
    drama: path.resolve(__dirname, '../src/drama-helper/main.js')
  },
  mode: node_env,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src/drama-helper'),
    }
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: prod ? MiniCssExtractPlugin.loader : 'style-loader'
      }, {
        loader: 'css-loader'
      }]
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [path.resolve(__dirname, '../src/drama-helper')]
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]'
      }
    }]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'drama.html',
      template: path.resolve(__dirname, '../src/drama-helper/drama-helper.html'),
      chunks: ['drama']
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
