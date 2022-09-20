import { message, notification } from 'ant-design-vue';
// 局部引入时请打开样式
// import 'ant-design-vue/es/message/style/index.less';
// import 'ant-design-vue/es/notification/style/index.less';
import event from '@/utils/event';
import loading from '@/utils/loading';
import common from '@/utils/common';
// lodash局部引入
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import set from 'lodash/set';

export default (config = {}) => {
  // config
  window.$config = config;
  // lodash
  window._ = {
    forEach,
    get,
    set
  };
  // global loading
  window.$loading = loading(config);
  // common
  window.$common = common;
  // event bus
  window.$bus = event;
  // antd $message
  window.$message = message;
  // antd $notification
  window.$notification = notification;
};

// 后续扩展的全局属性，需要到eslintrc里设置global
export const winKeys = {
  // 注册app实例 [main.js]
  $ROOT: '$ROOT',
  // 注册entry实例 [App.vue]
  $ENTRY: '$ENTRY'
};

// window属性注册机
export const winRegister = (key, val) => {
  if (winKeys[key] == null) {
    console.warn('未定义的win_key:', key);
    return;
  }
  window[key] = val;
};
