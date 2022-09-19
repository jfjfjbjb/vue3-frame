import _ from 'lodash';

const routeTree = [
  {
    path: '/home',
    name: 'home',
    meta: {
      desc: '首页',
      icon: 'home-outlined',
      navi: ['home']
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
          desc: '系统配置'
          // navi: ['config', 'configSystem'],
          // isEntry: true
        },
        component: () => import('@/views/config/system/index.vue'),
        includes: [
          {
            path: '/config/system/add',
            name: 'configSystemAdd',
            meta: {
              desc: '新增'
              // navi: ['config', 'configSystem', 'configSystemAdd']
            },
            component: () => import('@/views/config/system/add/index.vue')
          }
        ]
      }
    ]
  }
];

// 将routeTree转换
const routes = [];
const routeMap = {};
function loop(list = [], parent) {
  list.forEach((item) => {
    // 设置_parent
    parent && _.set(item, 'meta._parent', parent);
    // 设置isEntry
    if (item.path !== 'null' && (!parent || item.includes)) {
      _.set(item, 'meta.isEntry', true);
    }
    // 设置navi
    if (!_.get(item, 'meta.navi')) {
      _.set(
        item,
        'meta.navi',
        parent ? [...parent.meta.navi, item.name] : [item.name]
      );
    }
    routes.push(item);
    routeMap[item.name] = item;

    if (item.children) {
      loop(item.children, item);
    }
    if (item.includes) {
      loop(item.includes, item);
    }
  });
}
loop(routeTree);

export { routes, routeMap };
