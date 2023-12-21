const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('@vant/auto-import-resolver');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  pwa:{
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  configureWebpack:{
    plugins: [
      ComponentsPlugin.default({ resolvers: [VantResolver()] }), //当 unplugin-vue-components 版本大于等于 0.26.0
    ],
  }
})
