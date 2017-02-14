module.exports = {
  context: __dirname,
  entry: "./entry.jsx",
  output: {
      path: __dirname,
      filename: "bundle.js"
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.coffee'],
    modules: ['node_modules']
  },
};