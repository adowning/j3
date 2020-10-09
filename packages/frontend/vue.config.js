module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map',
    optimization: {
      runtimeChunk: 'single'
    }
  }
}
