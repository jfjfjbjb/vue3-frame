import common from './common';
import component from './component';

function resolveModules(parent, modules) {
  // console.log(modules);
  const comps = [];

  // 异步写法
  // for (const key in modules) {
  //   modules[key]().then((mod: any) => {
  //     const nameMatch = key.match(/^\.\/([\s\S]+)\/.+/);
  //     const _key = nameMatch != null ? nameMatch[1] : '';
  //     comps.push({
  //       key: _key,
  //       name: _key,
  //       comp: mod.default
  //     });
  //   });
  // }

  // 同步写法
  for (const key in modules) {
    const nameMatch = key.match(/^\.\/([\s\S]+)\/.+/);
    const _key = nameMatch != null ? nameMatch[1] : '';
    comps.push({
      key: _key,
      name: _key,
      parent,
      comp: modules[key].default
    });
  }
  return comps;
}

/**
 * 目前采取的是每个块独立提取组件，然后解析拼接
 * 优势：只需添加组件文件，即可完成新增
 * 劣势：无法排序和选择
 * -- 如果需要，后续可调整为在本文件统一提取组件，解析后传出，由外部决定顺序等
 */
export default {
  common: resolveModules('common', common),
  component: resolveModules('component', component)
};
