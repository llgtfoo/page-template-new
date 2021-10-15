import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less' //ui库
import * as echarts from 'echarts' //百度echarts图表
import { createApp } from 'vue'
import App from './App.vue'
import components from './components/index' //全局组件
import directives from './directives/index' //全局指令
import axiosPlugin from './http/axios' //axios请求协议
import http from './http/index' //自定义post和get协议
//import './permission' //路由守卫
import router from './router'
import store from './store'
import utils from './utils/index' //全局工具函数
import views from './views/index' //模块化入口
import '/@/assets/css/init.css' //全局默认css
import '/@/assets/css/scroll.scss' //全局默认css
const app = createApp(App)
  .use(views, router, store)
  .use(axiosPlugin)
  .use(utils)
  .use(router)
  .use(store)
  .use(components)
  .use(directives)
  .use(Antd)
//全局挂载
app.config.globalProperties.$http = http
app.config.globalProperties.$echarts = echarts
export default app
