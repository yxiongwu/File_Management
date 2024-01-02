const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./web/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/, // 匹配js、ts、jsx、tsx文件，
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // 使用babel转译,
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/, // 匹配sass文件
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    host: "127.0.0.1",
    port: 9000,
    proxy: {
      "/file": {
        target: "http://localhost:3000",
        secure: false,
        changeOrigin: true,
      },
    },
  },
};
