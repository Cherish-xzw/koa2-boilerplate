const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const AssetsWebpackPlugin = require("assets-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");

const IS_PROD = process.env.NODE_ENV === "production";
const ROOT_PATH = path.resolve(__dirname, "..");

function resolve(dir) {
  return path.join(ROOT_PATH, dir);
}

const config = {
  name: 'client',

  target:'web',

  context: resolve("src/assets/javascripts"),

  entry: {
    application: ["babel-polyfill", "./application.js"]
  },

  output: {
    path: resolve("public/static"),
    publicPath: "/static/",
    filename: IS_PROD ? "js/[name].[chunkhash].js" : "[name].js",
    chunkFilename: IS_PROD ? "js/[name].[chunkhash].js" : "[name].chunk.js" // works with lazy loading
  },

  resolve: {
    extensions: [".js", ".vue", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [{ loader: "css-loader" }, { loader: "sass-loader" }],
          fallback: "style-loader"
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|vendor\/assets)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "env",
                {
                  targets: {
                    browsers: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"]
                  }
                }
              ],
              ["stage-2"]
            ]
          }
        }
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 2048,
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: "file-loader",
          options: {
            limit: 10000,
            name: "fonts/[name].[hash:7].[ext]"
          }
        }
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: resolve("src/assets/images"),
        to: resolve("public/static/images")
      }
    ]),
    new ExtractTextPlugin({
      filename: IS_PROD ? "css/[name].[contenthash].css" : "[name].css"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify("production") }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendors",
      minChunks: function(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, "../node_modules")) === 0
        );
      }
    })
  ]
};

if (!IS_PROD) {
  config.devtool = "cheap-module-eval-source-map";
  config.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin());
}

if (IS_PROD) {
  config.devtool = "source-map";
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      },
      sourceMap: true,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new AssetsWebpackPlugin({
      filename: "manifest.json",
      path: resolve("public/static"),
      prettyPrint: true
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      chunks: ["vendors"]
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })
  );

  // https://webpack.js.org/configuration/performance
  config.performance = {
    hints: "warning"
  };
}

module.exports = config;
