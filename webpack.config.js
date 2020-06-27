const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devServer: {
    historyApiFallback: true,
    port: 80,
  },
  output: {
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, 'src', 'components'),
      services: path.resolve(__dirname, 'src', 'services'),
      utils: path.resolve(__dirname, 'src', 'utils'),
      images: path.resolve(__dirname, 'src', 'assets', 'images'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
      cache: true,
      parallel: true,
    })],
  },
  stats: {
    children: false,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.VARIABLE_NAME': JSON.stringify('This is a environment variable'),
    }),
  ],
};
