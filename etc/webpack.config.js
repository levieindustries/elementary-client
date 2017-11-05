const HtmlWebpackPlugin = require("html-webpack-plugin");
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
          failOnError: true,
          configFile: "./.eslintrc.json"
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["env", "stage-0", "react"]
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
    new webpack.EnvironmentPlugin({
      WATCH: JSON.stringify(process.env.WATCH || 0)
    }),
    new HtmlWebpackPlugin({
      title: "Elementary",
      filename: "public/index.html",
      template: "src/public/index.html"
    })
  ]
};
