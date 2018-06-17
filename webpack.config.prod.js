const baseConfig = require('./webpack.config.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  ...baseConfig,
  ...{
    mode: 'production',
    output: {
      path: path.resolve(__dirname, './build'),
      filename: 'bundle.[chunkhash].js',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, './app'),
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                modules: true,
                minify: true,
                localIdentName: '[hash:base64:7]',
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.resolve(__dirname, './app/styles/_variables.scss'),
                ],
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|svg|png|jpe?g)$/,
          use: 'file-loader',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './app/templates/index.ejs'),
        filename: 'index.html',
        minify: true,
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[chunkhash].css',
      }),
      new CleanWebpackPlugin(['build']),
    ],
  },
}
