// import * as modules from './*/index.js'
const importAll = (context) => {
  const map = {}
  for (const key of Object.keys(context)) {
    const keyArr = key.split('/')
    keyArr.shift() // 移除.
    map[keyArr.join('.').replace(/index.js/g, '')] =
      context[key] && context[key].default
  }
  return map
}

const req=import.meta.globEager("./*/index.js") //读文件
const modules = importAll(req)

const initRoute = [
  {
    path: '/',
    name: 'root',
    redirect: '/home',
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
export default {
  install: (Vue, router, store) => {
    Object.keys(modules).forEach(key => {
      Vue.use(modules[key], store, router)
    })
    initRoute.forEach((route) => router.addRoute(route))
    console.log(router.getRoutes(), '-')
  },
}