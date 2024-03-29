// eslint-disable-next-line
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: './dist',
  },
  devtool: 'inline-source-map',
});
