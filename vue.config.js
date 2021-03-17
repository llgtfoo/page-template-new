const path = require('path')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  pluginOptions: {
    PROJ_TYPE: 'template', // 项目类型
  },
  //webpack配置---目录别名
  configureWebpack: {
    resolve: {
      alias: { //配置文件路径别名
        comps: path.join(__dirname, 'src/components'), //组件
        dcts: path.join(__dirname, 'src/directives'), //指令
        http: path.join(__dirname, 'src/http'),
        mock: path.join(__dirname, 'src/mock'), //mock数据
        utils: path.join(__dirname, 'src/utils'), //工具函数
      },
    },
  },
  // chainWebpack: (config) => {
  //     config.resolve.alias
  //         .set('vue$', 'vue/dist/vue.esm.js')
  // },
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.fastmock.site/mock/a76ff711b33a233cdeac2112d8d909d0/llgtfoo/',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  productionSourceMap: false,
}
