/**
 * @name:注册全局指令
 */
const req = require.context('./', true, /\.js$/)
export default {
  install: (Vue: any) => {
    req.keys().map(req).forEach((ele: any) => {
      if (ele.default) {
        Vue.use(ele.default)
      }
    })
  }
}