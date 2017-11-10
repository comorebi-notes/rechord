const environment = require('./environment')
const webpack     = require('webpack')

environment.plugins.set(
  "UglifyJs",
  new webpack.optimize.UglifyJsPlugin({
    parallel:   true,
    sourceMap:  false,
    mangle:     false,
    uglifyOptions: {
      mangle:   false
    },
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  })
)

module.exports = environment.toWebpackConfig()
