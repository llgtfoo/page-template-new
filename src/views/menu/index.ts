import moduleRouters from './router'
import modulesStores from './store'
export default (Vue: any, store: any, router: any) => { // eslint-disable-line
  router.addRoute(moduleRouters())
  store.registerModule('menu', modulesStores())
}