// 注册全局组件
const req = import.meta.globEager("./*/index.vue") 
import { formatComponentName } from 'utils/index'
export default {
  install: (Vue) => {
    Object.values(req).forEach((ele) => {
      if (ele.default) {
        Vue.component(formatComponentName(ele.default.name), ele.default)
      }
    })
  }
}