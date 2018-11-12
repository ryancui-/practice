'use strict';

// FIXME 这个没有了 HMR
const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const drama_config = require('./webpack.drama');
const index_config = require('./webpack.index');
const labs_config = require('./webpack.labs');

const compiler = webpack([index_config, labs_config, drama_config]);

const devServerOptions = {
  contentBase: path.join(__dirname, '../dist'),
  compress: true
};

const server = new webpackDevServer(compiler, devServerOptions);

server.listen(2333, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:2333');
});
