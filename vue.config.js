const path = require('path')
const JavaScriptObfuscator = require('webpack-obfuscator')
const encryption = true

const resolve = dir => path.join(__dirname, dir)
let proxy_target_url = ''
if (process.env.NODE_ENV === 'development' && process.env.VUE_APP_ENV == 'dev-18') {
  proxy_target_url = 'https://webapi-xs.com'
} else if (process.env.NODE_ENV === 'development' && process.env.VUE_APP_ENV == 'dev-41') {
  proxy_target_url = 'https://fourlifecode.com'
}

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
        target: proxy_target_url,
        ws: true,
        changeOrigin: true
        // pathRewrite: {
        //   '^/pandora1': '/pandora1'
        // }
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
    if (process.env.NODE_ENV === 'production' && encryption == true) {
      return {
        plugins: [
          new JavaScriptObfuscator(
            {
              rotateUnicodeArray: true,
              compact: true,
              controlFlowFlattening: true,
              controlFlowFlatteningThreshold: 0.8,
              deadCodeInjection: true,
              deadCodeInjectionThreshold: 0.5,
              debugProtection: true,
              debugProtectionInterval: true,
              disableConsoleOutput: true,
              domainLock: [],
              identifierNamesGenerator: 'hexadecimal',
              identifiersPrefix: '',
              inputFileName: '',
              log: true,
              renameGlobals: false,
              reservedNames: [],
              reservedStrings: [],
              rotateStringArray: true,
              seed: 0,
              selfDefending: false,
              sourceMap: false,
              sourceMapBaseUrl: '',
              sourceMapFileName: '',
              sourceMapMode: 'separate',
              stringArray: true,
              stringArrayEncoding: false,
              stringArrayThreshold: 0.8,
              target: 'browser',
              transformObjectKeys: false,
              unicodeEscapeSequence: true
            },
            ['abc.js']
          )
        ]
      }
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
