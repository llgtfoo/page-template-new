import '@/assets/css/init.css' //全局默认css
import '@/assets/css/scroll.scss' //全局默认css
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css' //ui库
import { createApp } from "vue"
import { sync } from 'vuex-router-sync'
import App from "./App.vue" //入口文件
import components from './components/index' //全局组件
import directives from './directives/index' //全局指令
import axios from './http/axios' //axios请求协议
import http from "./http/index" //自定义post和get协议
import router from "./router" //路由
import store from "./store" //状态管理
import utils from './utils/index' //全局工具函数
sync(store, router)//route和store结合


const app = createApp(App)
  .use(axios)
  .use(store)
  .use(router)
  .use(components)
  .use(directives)
  .use(utils)
  .use(Antd)
  
app.config.globalProperties.$http = http
export default app
