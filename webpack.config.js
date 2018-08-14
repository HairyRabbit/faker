import path from 'path'

export default {
  mode: process.env.NODE_ENV,
  node: false,
  entry: './src/index.js',
  output: {
    path: path.resolve('.'),
    filename: 'index.js'
  },
  module: {
    rules: [{
      test: /.js$/,
      use: 'babel-loader'
    }]
  },
  optimization: {
    minimize: false
  },
  plugins: [

  ],
  externals: [

  ]
}
