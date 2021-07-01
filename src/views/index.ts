// import * as modules from './*/index.js'
const importAll = (context: any) => {
  const map = {}
  for (const key of context.keys()) {
    const keyArr = key.split('/')
    keyArr.shift() // 移除.
    map[keyArr.join('.').replace(/index.ts/g, '')]
      = context(key) && context(key).default
  }
  return map
}
const req = require.context('./', true, /index.ts/i)//webpack读文件
const modules = importAll(req)

const initRoute = [
  {
    path: '/',
    name: 'root',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./login/index.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../components/NotFound/index.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    name: 'not-found',
    component: () => import('../components/NotFound/index.vue'),
  },
]
type router = {
  path: String,
  name: String,
  component?: any
  redirect?: String,
}
export default {
  install: (Vue: any, router: any, store: any) => {
    Object.keys(modules).forEach(key => {
      Vue.use(modules[key], store, router)
    })
    initRoute.forEach((route: router) => router.addRoute(route))
    console.log(router.getRoutes(), '-')
  },
}
