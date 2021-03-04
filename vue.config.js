'use strict'
const path = require('path')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  outputDir: 'build',
  lintOnSave: false,
  productionSourceMap: process.env.NODE_ENV === 'development',
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    // proxy: {
    //   '/pandora1': {
    //     target: 'http://106.15.88.18:8002',
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/pandora1': '/'
    //     }
    //   }
    // }
    proxy: {
      '/pandora1': {
        target: 'http://106.15.88.18',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/pandora1': '/pandora1'
        }
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'SooYi.CN',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@s', resolve('src/services'))
      .set('@a', resolve('src/assets'))
      .set('@c', resolve('src/components'))
      .set('@v', resolve('src/views'))
      .set('@x', resolve('src/store'))
      .set('@l', resolve('src/libs'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  }
}
