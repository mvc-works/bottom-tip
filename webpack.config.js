var path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: ["./src/main"],
  },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/build"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
