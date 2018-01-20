const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const ROOT_PATH = path.resolve(__dirname, "..");

function resolve(dir) {
  return path.join(ROOT_PATH, dir);
}

const config = {
  name: 'server',
  target: 'node',

  context: resolve('src'),

  entry: {
    server: './server.js'
  },

  output: {
    path: resolve('dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },

  resolve: {
    extensions: ['.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "env",
                {
                  targets: {
                    node: '6.3'
                  },
                  modules: false,
                  useBuiltIns: false,
                  debug: false,
                }
              ],
              ["stage-2"]
            ],
          }
        }
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: resolve("src/view"),
        to: resolve("dist/view")
      }
    ]),

    // Adds a banner to the top of each generated chunk
    // https://webpack.js.org/plugins/banner-plugin/
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],

  externals: [
    nodeExternals({
      whitelist: [
        /koa-*/
      ],
    })
  ],

  // Do not replace node globals with polyfills
  // https://webpack.js.org/configuration/node/
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

}

module.exports = config;
