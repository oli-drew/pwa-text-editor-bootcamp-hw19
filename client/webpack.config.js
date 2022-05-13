const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    //
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        favicon: `./favicon.ico`,
        title: "JATE Text Editor",
      }),
      // Create the service worker
      new GenerateSW(),
      new WebpackPwaManifest({
        name: "JUST ANOTHER TEXT EDITOR",
        short_name: "JATE",
        description: "A PWA text editor for the people",
        background_color: "#e06fe8",
        theme_color: "#a971de",
        start_url: "./",
        publicPath: "./",
        inject: true,
        fingerprints: false,
        icons: [
          {
            src: path.resolve("./src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    // CSS Loaders and Babel
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
