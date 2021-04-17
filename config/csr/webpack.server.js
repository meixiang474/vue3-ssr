const path = require("path");
const nodeExternal = require("webpack-node-externals");
const { merge } = require("webpack-merge");
const base = require("./webpack.base");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(base, {
  mode: "development",
  target: "node",
  entry: {
    bundle: path.join(__dirname, "../../src/server/index.ts"),
  },
  output: {
    path: path.join(__dirname, "../../build"),
    filename: "[name].js",
  },
  externals: [nodeExternal()],
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*"],
    }),
  ],
});
