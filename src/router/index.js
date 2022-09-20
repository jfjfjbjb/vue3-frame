import {
  createRouter,
  // createWebHistory,
  createWebHashHistory
} from 'vue-router';
import Layout from '@/layout/index.vue';
import { routes } from './config';

/**
 * 目前选用了createWebHashHistory，保证兼容性
 */
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
        desc: '帮助页'
      },
      component: () => import('../views/help/index.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'exception',
      meta: {
        desc: '异常页'
      },
      component: () => import('../views/exception/index.vue')
    }
  ]
});

let timeout = null;
// 用于存储请求，方便路由切换时统一取消
// -- 不是提供给开发取用，所以没有走window.js逻辑
window._axiosPromiseArr = [];

/**
 * 路由守卫
 */
router.beforeEach(async (to, from) => {
  // 超过200ms，显示过度动画
  timeout = setTimeout(() => {
    $ENTRY.showMask();
  }, 500);

  // 路由切换，canel上一个页面的请求
  window._axiosPromiseArr.forEach((cancel, index) => {
    cancel && cancel();
    delete window._axiosPromiseArr[index];
  })
});
router.afterEach(async (to, from) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  $ENTRY.hideMask();
});

export default router;
