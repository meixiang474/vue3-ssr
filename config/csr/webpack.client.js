const path = require("path");
const { merge } = require("webpack-merge");
const base = require("./webpack.base");
const HtmlPluginWebpack = require("html-webpack-plugin");

module.exports = merge(base, {
  mode: "development",
  entry: {
    index: path.join(__dirname, "../../src/client/index.ts"),
  },
  output: {
    path: path.join(__dirname, "../../public"),
    filename: "[name].js",
  },
  devServer: {
    open: true,
    port: 8080,
    hot: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
      },
    },
  },
  plugins: [
    new HtmlPluginWebpack({
      template: path.join(__dirname, "../../src/index.html"),
      scriptLoading: "defer",
    }),
  ],
});
