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
    console.log(Vue, router, store)
    // Object.keys(modules).forEach(key => {
    //   Vue.use(modules[key], store, router)
    // })
    initRoute.forEach((route: router) => router.addRoute(route))
  },
}