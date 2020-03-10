module.exports = {
  // 添加cdn引用包
    configureWebpack: {
      externals: {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'axios':'axios',
        'element-ui': 'ELEMENT'
      }
  },
  devServer: {
    port: 8020,
    host: '0.0.0.0',
    open: true,
    proxy: {
      '/api': {
        //target: 'http://10.131.6.135:8312',
        //target: 'http://app-bg.justfollow.vip',
        // target: 'http://test.app-bg.justfollow.vip',
        target:'http://admin.huigen.talkingcake.cn',
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '/api' // 重写路径
        }
      }
    }
  }
}
