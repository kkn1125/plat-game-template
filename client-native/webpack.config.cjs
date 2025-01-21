// import path from 'path';
// import webpack from 'webpack';
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin')

const aliasMap = {
  '@assets': path.resolve(__dirname, 'src/assets'),
  '@types': path.resolve(__dirname, 'src/types'),
  '@variable': path.resolve(__dirname, 'src/variable'),
  '@api': path.resolve(__dirname, 'src/api'),
  '@config': path.resolve(__dirname, 'src/config'),
  '@core': path.resolve(__dirname, 'src/engine/core'),
  '@animation': path.resolve(__dirname, 'src/engine/animation'),
  '@entity': path.resolve(__dirname, 'src/engine/entity'),
  '@event': path.resolve(__dirname, 'src/engine/event'),
  '@engine': path.resolve(__dirname, 'src/engine'),
  '@model': path.resolve(__dirname, 'src/model'),
  '@store': path.resolve(__dirname, 'src/store'),
  '@util': path.resolve(__dirname, 'src/util'),
  '@test': path.resolve(__dirname, 'src/test'),
  '@': path.resolve(__dirname, 'src'),
};

/** @type {webpack.Configuration} */
const config = {
  mode: 'production', // 필요에 따라 development로 변경 가능
  // mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: aliasMap,
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
        },
      }),
    ],
  },
};

const cjsConfig = {
  ...config,
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'index.js',
    libraryTarget: 'commonjs2', // CommonJS 모듈 형식
  },
};

const esmConfig = {
  ...config,
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'index.esm.js',
    libraryTarget: 'module', // ES Module 형식
  },
  experiments: {
    outputModule: true, // ESM 지원 활성화
  },
};

// export default config;
module.exports = [cjsConfig, esmConfig];
