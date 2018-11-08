const webpack = require('webpack');
const rm = require('rimraf');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const drama_config = require('./webpack.drama');
const index_config = require('./webpack.index');

const spinner = ora('Building for production...');
spinner.start();

rm(path.resolve(__dirname, '../dist'), err => {
  if (err) throw err;

  const compiler = webpack([index_config, drama_config]);
  const fn = (err, stats) => {
    spinner.stop();
    if (err) throw err;

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    if (stats.hasErrors()) {
      console.log(stats);
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    }

    console.log(chalk.cyan('  Build complete.\n'));
  };

  compiler.run(fn);
});

