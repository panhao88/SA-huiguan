// const isPro = process.env.NODE_ENV === 'production'
module.exports = {
  // publicPath: isPro ? './' : '',  //  公共路径
  // outputDir: 'dist',  //  打包后的路径
  // assetsDir: 'static', //静态资源(js|css|img|fonts)目录
  // lintOnSave: process.env.NODE_ENV === 'development',//设置是否在开发环境下每次保存代码时都启用 eslint验证
  // productionSourceMap: false,// 生产环境的 source map 用于定位代码错误
  devServer: {
    proxy: {
      '/api': {
        ws: false,
        // target: 'http://192.168.123.57:8081',
        // target:'http://192.168.123.57:8081',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  }
}