const routeTree = [
  {
    path: '/home',
    name: 'home',
    meta: {
      desc: '首页',
      navi: ['home']
    },
    component: () => import('@/views/home/index.vue')
  },
  {
    path: 'null',
    name: 'config',
    meta: {
      desc: '配置管理'
    },
    children: [
      {
        path: '/config/system',
        name: 'configSystem',
        meta: {
          desc: '系统配置',
          navi: ['config', 'system'],
          isEntry: true
        },
        component: () => import('@/views/config/system/index.vue')
      },
      {
        path: '/config/system/add',
        name: 'configSystemAdd',
        meta: {
          desc: '系统配置新增',
          navi: ['config', 'system', 'systemAdd']
        },
        component: () => import('@/views/config/system/add/index.vue')
      }
    ]
  }
];

// 将routeTree转换为一维数组
const routes = [];
function loop(list = []) {
  list.forEach((item) => {
    routes.push(item);

    if (item.children) {
      loop(item.children);
    }
  });
}
loop(routeTree);

export default {
  routes
};
