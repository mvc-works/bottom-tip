
module.exports = {
  entry: {
    main: [
      'webpack/hot/only-dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      './src/main.js'
    ]
  },
  output: {
    filename: 'bundle.js',
    path: 'build/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015!eslint'
      }
    ]
  },
  eslint: {
    emitWarning: true
  }
}
