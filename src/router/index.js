import { createRouter,createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
      {
          path:'/index',
          name:'index',
          component:()=>import('../views/index.vue')
      },
       {
          path:'/home',
          name:'home',
          component:()=>import('../views/home.vue')
      },
      {
          path:'/login',
          name:'login',
          component:()=>import('../views/login/index.vue')
      }
  ]
});

export default router