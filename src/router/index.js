import {
  createRouter,
  // createWebHistory,
  createWebHashHistory
} from 'vue-router';
import Layout from '@/layout/index.vue';
import config from './config';

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'root',
      component: Layout,
      redirect: '/help',
      children: [...config.routes]
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
