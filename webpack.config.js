import path from 'path'

export default {
  mode: process.env.NODE_ENV,
  node: false,
  entry: './src/index.js',
  output: {
    path: path.resolve('.'),
    filename: 'index.js',
    library: 'Faker',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [{
      test: /.js$/,
      exclude: [],
      use: 'babel-loader'
    }]
  },
  optimization: {
    minimize: false
  },
  plugins: [

  ],
  externals: [
    // function(ctx, req, cb) {
    //   if(/\.json$/.test(req)) {
    //     return cb(null, './data/' + req)
    //   }

    //   return cb()
    // }
  ]
}
