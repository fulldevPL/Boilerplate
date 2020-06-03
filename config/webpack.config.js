const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
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
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|png|jpeg|svg|gif)$/,
        use: 'file-loader',
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
    // Secondary Webpage
    // new HtmlWebpackPlugin({
    //   title: 'About',
    //   filename: 'about.html',
    //   template: 'src/about.html',
    //   hash: true,
    // }),
  ],
};
