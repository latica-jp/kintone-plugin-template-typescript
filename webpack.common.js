const path = require('path')
const WebpackPluginKintonePlugin = require('@kintone/webpack-plugin-kintone-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { pluginZipFilePath } = require('./webpack-utils')
module.exports = {
  entry: {
    desktop: './src/ts/desktop.tsx', // デスクトップ用
    config: './src/ts/config.tsx', // プラグイン設定画面用
  },
  output: {
    path: path.resolve(__dirname, 'src', 'dist'), // src と同一階層に dist を作成してそちらを設定
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      { test: /\.(png|jpg|gif)$/i, loader: 'url-loader' },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new WebpackPluginKintonePlugin({
      manifestJSONPath: './src/manifest.json',
      privateKeyPath: './private.ppk',
      pluginZipPath: pluginZipFilePath,
    }),
  ],
}
