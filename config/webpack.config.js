const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    script: './src/index.js',
  },
  output: {
    filename: '[name].[contenthash:6].js',
    path: path.resolve(__dirname, '../', 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    contentBase: path.resolve(__dirname, '../', 'public'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'My app',
      template: 'src/index.html',
    }),
  ],
};
