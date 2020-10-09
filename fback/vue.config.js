module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map',
    optimization: {
      runtimeChunk: 'single'
    },
    devServer: {
      port: 8080
    }
  }
}
