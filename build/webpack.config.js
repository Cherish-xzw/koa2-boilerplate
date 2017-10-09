const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const project = require('./project.config');

const __DEV__ = project.globals.__DEV__;
const __PROD__ = project.globals.__PROD__;

const config = {
  context: project.paths.src('assets/javascripts'),

  entry: {
    application: './application.js',
  },

  output: {
    path: project.paths.src('public'),
    publicPath: __PROD__ ? project.production.compiler_public_path : '/',
    filename: __DEV__ ? '[name].js' : 'js/[name].[chunkhash].js',
    // work with lazy loading
    chunkFilename: __DEV__ ? '[name].js' : 'js/[name].[chunkhash].js',
  },

  resolve: {
    extensions: [ '.js', '.json' ],
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [{ loader: 'css-loader' }, { loader: 'sass-loader' }],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|vendor\/assets)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ 'es2015' ],
          },
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[hash:7].[ext]',
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]',
          },
        },
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: project.paths.src('assets/images'),
        to: project.paths.src('public/images'),
      },
    ]),
    new ExtractTextPlugin({
      filename: __DEV__ ? 'application.css' : 'css/[name].[contenthash].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: 'lodash',
    }),
    new webpack.DefinePlugin(project.globals),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: function(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
        );
      },
    }),
  ],
};

if (__DEV__) {
  config.devtool = project.development.compiler_devtool;
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
}

if (__PROD__) {
  config.devtool = project.production.compiler_devtool;
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new AssetsWebpackPlugin({
      filename: 'assets_map.json',
      path: project.paths.src('public'),
      prettyPrint: true,
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: [ 'vendors' ],
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
      },
    })
  );

  // https://webpack.js.org/configuration/performance
  config.performance = {
    hints: 'warning',
  };
}

module.exports = config;
