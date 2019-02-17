const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CONFIG = require('./constants/config');
const path = require('path');

module.exports = {
  mode: CONFIG.PROD ? 'production' : 'development',

  entry: './components/App.jsx',

  output: {
    publicPath: '/static/',
    filename: CONFIG.PROD ? '[name].[hash].js' : '[name].js',
    pathinfo: false,
    path: path.resolve(__dirname, 'dist')
  },

  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'components'),
          path.resolve(__dirname, 'constants'),
          path.resolve(__dirname, 'lib')
        ],
        exclude: /node_modules/,
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['last 2 Chrome versions']
                }
              }
            ],
            '@babel/preset-react'
          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(CONFIG.PROD ? 'production' : 'development')
      }
    }),
    new HtmlWebpackPlugin({
      minify: CONFIG.PROD,
      template: 'template.html'
    }),
    CONFIG.PROD ? new CompressionPlugin({ filename: '[path].gz' }) : null,
    CONFIG.PROD ? null : new webpack.HotModuleReplacementPlugin()
  ].filter(p => p !== null),

  devtool: 'inline-source-map',

  watchOptions: {
    aggregateTimeout: 500,
    ignored: ['node_modules', 'dist']
  },

  devServer: {
    historyApiFallback: true,
    /** @todo remove this eventually */
    disableHostCheck: true,
    contentBase: path.join(__dirname, 'dist'),
    port: CONFIG.PORT,
    hot: true
  }
};
