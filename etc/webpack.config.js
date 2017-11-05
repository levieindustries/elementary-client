const LiveReloadPlugin = require("webpack-livereload-plugin");
const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        loader: "eslint-loader",
        exclude: /node_modules/,
        options: {
          emitWarning: true,
          configFile: "./.eslintrc.json"
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "stage-0", "react"]
          }
        }
      },
      {
        test: /\.scss/,
        loaders: [
          "style-loader",
          "css-loader?modules",
          "sass-loader"
        ]
      }
    ]
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "../build")
  },
  devtool: "source-map",
  plugins: [
    new LiveReloadPlugin(),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.EnvironmentPlugin(["WATCH"])
  ]
};
