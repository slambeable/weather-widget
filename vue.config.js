const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/weather-widget/'
    : '/',
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      extensions: ['ts'],
      alias: {
        api: path.resolve(__dirname, 'src/api/server'),
      },
    },
    output: {
      filename: 'all.min.js',
      chunkFilename: 'all.min.js',
    },
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new StyleLintPlugin({
        files: [path.resolve(__dirname, 'src/**/*.{vue,scss}')],
      }),
    ],
  },
  css: {
    extract: false,
  },
  productionSourceMap: false,
  devServer: {
    https: true,
  },
});
