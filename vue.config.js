const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin') // eslint-disable-line
// const CircularDependencyPlugin = require('circular-dependency-plugin') // eslint-disable-line

// TYPE是在package.json的scripts中手动指定的(指令错误)
// const isLib = process.env.TYPE === 'lib'
const isLib =
  process.env &&
  process.env.npm_lifecycle_script &&
  process.env.npm_lifecycle_script.includes('--type lib')

module.exports = {
  // 通过chainWebpack扩展webpack
  chainWebpack(config) {
    if (!isLib) {
      config.plugin('monaco').use(new MonacoWebpackPlugin())
    }
    // config.plugin('circular').use(new CircularDependencyPlugin())
  },
}
