const _ = require("lodash");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {index: "./src/index.js"},
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
          presets: ["env", "react"]
        }
      },
      {
        test: /\.scss/,
        exclude: [/node_modules/],
        use: [
          {loader: "style-loader", options: {sourceMap: true}},
          {loader: "css-loader", options: {modules: true, sourceMap: true, importLoaders: 1}},
          {loader: "postcss-loader", options: {sourceMap: true}},
          {loader: "sass-loader", options: {sourceMap: true}}
        ]
      }
    ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../build")
  },
  devtool: "source-map",
  plugins: _.compact([
    new LiveReloadPlugin(),
    process.env.MINIFY ? new UglifyJSPlugin({sourceMap: true}) : null,
    new webpack.EnvironmentPlugin({
      WATCH: JSON.stringify(process.env.WATCH || 0)
    }),
    new HtmlWebpackPlugin({
      title: "Elementary",
      filename: "public/index.html",
      template: "src/public/index.html"
    })
  ])
};
