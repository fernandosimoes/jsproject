const webpack = require('webpack');
const path = require('path');
const jsFiles = require('./.webpack/getJsFiles');

module.exports = {
  context: __dirname + "/src/js",
  entry: jsFiles,
  output: {
    path: __dirname + "/dist/js",
    filename: "[name].js",
  },
  resolve: {
    modules: [
      path.resolve('./node_modules')
    ],
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  module: {
    loaders: [],
    rules: [
      {
        test: /\.js$/, enforce: "pre",
        use: [
          { loader: "babel-loader", options: { presets: ["es2015","stage-0"] } }
        ],
        exclude: /node_modules/
      },
    ],
  },
};
