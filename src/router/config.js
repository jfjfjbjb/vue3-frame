import _ from '@/utils/lodash';
import Layout from '@/layout/index.vue';

/**
 * meta属性说明
 * -- navi：导航 【如果不填，会自动生成】
 * -- isEntry: 默认children下第一个为入口
 * -- keepAlive：开启缓存
 * -- _parent: 父节点引用 【自动生成】
 */
const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          desc: '首页',
          icon: 'home-outlined',
          navi: ['home']
        },
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  {
    path: '/config',
    name: 'config',
    meta: {
      desc: '配置管理',
      icon: 'setting-outlined'
    },
    component: Layout,
    children: [
      {
        path: 'system',
        name: 'configSystem',
        meta: {
          desc: '系统配置',
          keepAlive: true
          // navi: ['config', 'configSystem'],
          // isEntry: true
        },
        component: () => import('@/views/config/system/index.vue')
      },
      {
        path: 'system/add',
        name: 'configSystemAdd',
        meta: {
          desc: '新增'
          // navi: ['config', 'configSystem', 'configSystemAdd']
        },
        component: () => import('@/views/config/system/add/index.vue')
      }
    ]
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
];

// 将routeTree转换
const routeMap = {};
function loop(list = [], parent) {
  list.forEach((item, index) => {
    // 设置isEntry
    if (!(item.children && item.children.length > 0) && index === 0) {
      _.set(item, 'meta.isEntry', true);
    }
    // 设置_parent（如果!isEntry，设置parent为entry节点）
    if (parent) {
      const _parent = index > 0 ? _.get(parent, 'children.0') : parent;
      _.set(item, 'meta._parent', _parent);
    }
    // 设置navi
    if (!_.get(item, 'meta.navi')) {
      const _parent = _.get(item, 'meta._parent');
      _.set(
        item,
        'meta.navi',
        _parent ? [...(_.get(_parent, 'meta.navi') || []), item.name] : [item.name]
      );
    }
    routeMap[item.name] = item;

    if (item.children) {
      loop(item.children, item);
    }
  });
}
loop(routes);

export { routes, routeMap };
