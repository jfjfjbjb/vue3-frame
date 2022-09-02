import {
  createRouter,
  // createWebHistory,
  createWebHashHistory
} from 'vue-router';
import Layout from '../layout/index.vue';

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'root',
      component: Layout,
      redirect: '/help',
      children: [
        {
          path: '/home',
          name: 'home',
          meta: {
            desc: '首页',
            navi: ['home']
          },
          component: () => import('../views/home/index.vue')
        }
      ]
    },
    {
      path: '/help',
      name: 'help',
      meta: {
        desc: '帮助页',
        navi: ['help']
      },
      component: () => import('../views/help/index.vue')
    }
  ]
});

export default router;
