const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CONFIG = require('./config');
const path = require('path');

const PROD = CONFIG.environment.type == 'production';

module.exports = {
  mode: CONFIG.environment.type,

  entry: './client/components/App.jsx',

  output: {
    publicPath: '/static/',
    filename: PROD ? '[name].[hash].js' : '[name].js',
    path: path.resolve(__dirname, 'static')
  },

  resolve: {
    modules: [path.resolve(__dirname, 'client'), 'node_modules'],
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'client', 'components'),
          path.resolve(__dirname, 'client', 'constants'),
          path.resolve(__dirname, 'client', 'lib')
        ],
        exclude: /node_modules/,
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: [
                    'last 1 iOS version',
                    'last 2 Chrome versions',
                    'last 1 Android version',
                    'last 1 Firefox version'
                  ]
                }
              }
            ],
            '@babel/preset-react'
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-syntax-dynamic-import'
          ]
        }
      },
      {
        test: /\.s?css$/,
        use: [
          PROD ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: { outputStyle: PROD ? 'compressed' : 'expanded' }
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: { publicPath: '/static' }
          }
        ]
      }
    ]
  },

  plugins: [
    PROD
      ? new MiniCssExtractPlugin({
          filename: '[name].[hash].css',
          chunkFilename: '[id].[hash].css'
        })
      : null,
    new HtmlWebpackPlugin({
      minify: PROD,
      template: 'template.html'
    }),
    PROD ? new CompressionPlugin({ filename: '[path].gz' }) : null,
    PROD ? null : new webpack.HotModuleReplacementPlugin()
  ].filter(p => p !== null),

  devtool: 'inline-source-map',

  watchOptions: {
    aggregateTimeout: 500,
    ignored: ['node_modules', 'static']
  },

  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'static'),
    port: 20091,
    hot: true
  }
};
