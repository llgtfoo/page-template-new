// menu模块菜单配置
export default () => (
  {
    path: '/home',
    name: 'home',
    component: () => import('comps/Layout/index.vue'),
    redirect: '/home/index1',
    meta: {
      name: '模块一'
    },
    children: [
      {
        path: '/home/index1',
        name: 'index1',
        component: () => import('./views/children/menu-1/index.vue'),
        meta: {
          name: '菜单一'
        }
      },
      {
        path: '/home/index2',
        name: 'index2',
        component: () => import('./views/children/menu-2/index.vue'),
        meta: {
          name: '菜单二'
        }
      },
      {
        path: '/home/index3',
        name: 'index3',
        component: () => import('./views/children/menu-3/index.vue'),
        meta: {
          name: '菜单二'
        }
      },
    ],
  }
)