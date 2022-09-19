import {
  createRouter,
  // createWebHistory,
  createWebHashHistory
} from 'vue-router';
import Layout from '@/layout/index.vue';
import { routes } from './config';

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'root',
      component: Layout,
      redirect: '/home',
      children: [...routes]
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
