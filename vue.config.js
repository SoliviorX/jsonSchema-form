const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin') // eslint-disable-line
const CircularDependencyPlugin = require('circular-dependency-plugin') // eslint-disable-line

module.exports = {
  // 通过chainWebpack扩展webpack
  chainWebpack(config) {
    config.plugin('monaco').use(new MonacoWebpackPlugin())
    config.plugin('circular').use(new CircularDependencyPlugin())
  },
}
