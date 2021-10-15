
const req = require.context('./', true, /\.vue$/)
import { formatComponentName } from '../utils/index'
export default {
  install: (Vue: any) => {
    req.keys().map(req).forEach((ele: any) => {
      if (ele.default) {
        Vue.component(formatComponentName(ele.default.name), ele.default)
      }
    })
  }
}