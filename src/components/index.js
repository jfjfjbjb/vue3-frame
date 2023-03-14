import VNode from './VNode';
const modules = import.meta.glob('./*/*.vue', { eager: true });

/**
 * 解析glob动态引入的组件
 */
function resolveModules(modules) {
  const comps = {};
  for (const key in modules) {
    const nameMatch = key.match(/^\.\/([\s\S]+)\/.+/);
    const _key = nameMatch != null ? nameMatch[1] : '';
    comps[_key] = {
      comp: modules[key].default
    };
  }
  return comps;
}

export default function (app) {
  const config = {
    VNode: {
      name: 'VNode',
      comp: VNode
    },
    ...resolveModules(modules)
  };
  _.forEach(config, (item, key) => {
    if (item.name) {
      app.component(item.name, item.comp);
      return;
    }
    // 默认生成类似：<custom-input />
    app.component(
      `custom${key.replace(/[A-Z]/g, ($0) => {
        return '-' + $0.toLowerCase();
      })}`,
      item.comp
    );
  });
}
