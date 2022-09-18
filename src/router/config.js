import _ from 'lodash';

const routeTree = [
  {
    path: '/home',
    name: 'home',
    meta: {
      desc: '首页',
      navi: ['home'],
      icon: 'home-outlined'
    },
    component: () => import('@/views/home/index.vue')
  },
  {
    path: 'null',
    name: 'config',
    meta: {
      desc: '配置管理',
      icon: 'setting-outlined'
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

// 将routeTree转换
const routes = [];
const routeMap = {};
function loop(list = [], parent) {
  list.forEach((item) => {
    parent && _.set(item, 'meta._parent', parent);
    routes.push(item);
    routeMap[item.name] = item;

    if (item.children) {
      loop(item.children, item);
    }
  });
}
loop(routeTree);

export { routes, routeMap };
