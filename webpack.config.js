//
// webpack.config.js
// output.publicPath: '/workspace-rolodex/'
// devServer.static.publicPath: '/workspace-rolodex/'
// devServer.port: 9000
// devServer.proxy.target: 'http://localhost:5000'
// 
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');  // Import webpack to use the HMR plugin

module.exports = {
  mode: 'development', // Set the mode to 'development' or 'production'
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.[contenthash].js',
    publicPath: '/munsell-space/',  // Update this to match your repository name
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',  // Ensure this path is correct
      inject: 'body',
      scriptLoading: 'defer'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'favicon.ico', to: 'favicon.ico' },
        { from: 'media', to: 'media' }  // Ensure this path is correct
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),  // Add the HMR plugin
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/munsell-space/',  // Ensure this matches the output publicPath
    },
    compress: true,
    port: 9000,
    open: true,  // Automatically open the browser
    hot: true, // Enable Hot Module Replacement
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // The backend server URL
        changeOrigin: true,
        pathRewrite: { '^/api': '' }  // Remove /api prefix when forwarding
      }
    }
  },
};