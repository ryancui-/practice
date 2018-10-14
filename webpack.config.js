const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const env = process.env.NODE_ENV;

module.exports = {
  entry: './src/index.js',
  mode: env,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }]
    }]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['dist'])
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 2333
  },
  devtool: env === 'development' ? 'eval-source-map' : 'source-map'
};
