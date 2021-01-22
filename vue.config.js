// eslint-disable-next-line
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  // 通过chainWebpack扩展webpack
  chainWebpack(config) {
    config.plugin('monaco').use(new MonacoWebpackPlugin())
  },
}
