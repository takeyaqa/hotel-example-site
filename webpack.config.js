const path = require("node:path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    confirm: "./src/confirm.js",
    icon: "./src/icon.js",
    index: "./src/index.js",
    login: "./src/login.js",
    mypage: "./src/mypage.js",
    plans: "./src/plans.js",
    reserve: "./src/reserve.js",
    signup: "./src/signup.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        exclude: /vendor\/.+/,
      }),
    ],
  },
  devtool: "source-map",
};
