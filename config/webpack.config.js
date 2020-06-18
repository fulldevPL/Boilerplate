const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  devtool: 'source-map',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../', 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: ['raw-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: true,
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: true,
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|jpeg|svg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name]-[contenthash:6].[ext]',
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: '2.0.0',
                },
              ],
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },
  devServer: {
    // open: true,
    // https: true,
    compress: true,
    host: 'localhost',
    port: 8000,
    contentBase: path.resolve(__dirname, '../', 'public'),
  },
  plugins: [
    new BrowserSyncPlugin(
      {
        browser: ['chrome'],
        // browser: ['chrome', 'firefox', 'iexplore'],
        host: 'localhost',
        port: 8080,
        // proxy the Webpack Dev Server endpoint
        proxy: 'http://localhost:8000/',
      },
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false,
      }
    ),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'My app',
      template: 'src/templates/index.html',
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:6].css',
    }),
    // Secondary Webpage
    // new HtmlWebpackPlugin({
    //   title: 'About',
    //   filename: 'about.html',
    //   template: 'src/about.html',
    //   hash: true,
    // }),
  ],
};
