/**
 * @name:注册全局指令
 */
const req = import.meta.globEager("./*/index.js") 
export default {
  install: (Vue) => {
    Object.values(req).forEach((ele) => {
      if (ele.default) {
        Vue.use(ele.default)
      }
    })
  },
}