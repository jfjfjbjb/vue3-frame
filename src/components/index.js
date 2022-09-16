import VNode from './VNode';
import Input from './Input/index.vue';
import Empty from './Empty/index.vue';

/**
 * 组件集合，生成全局组件使用
 */
export default {
  VNode: {
    _default: false,
    name: 'VNode',
    comp: VNode
  },
  Input,
  Empty
};
