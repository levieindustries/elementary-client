const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["env", "react"]
        }
      },
      {
        test: /\.scss/,
        loaders: [
          "style-loader",
          "css-loader?modules",
          "sass-loader"]
      },
      {
        test: /\.html$/,
        loader: 'html'
      }
    ]
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "../build")
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Elementary",
      filename: "public/index.html"
    })
  ]
};
