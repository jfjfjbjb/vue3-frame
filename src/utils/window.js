import _ from 'lodash';
import { message, notification } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/css';
import 'ant-design-vue/es/notification/style/css';
import mitt from 'mitt';
import loading from '@/utils/loading';
import common from '@/utils/common';

export default (config = {}) => {
  // config
  window.$config = config;
  // lodash
  window._ = _;
  // global loading
  window.$loading = loading(config);
  // common
  window.$common = common;
  // event bus
  window.$bus = mitt();
  // antd $message
  window.$message = message;
  // antd $notification
  window.$notification = notification;
};

// 后续扩展的全局属性，需要到eslintrc里设置global
export const winKeys = {
  // 注册app实例 [main.js]
  $ROOT: '$ROOT'
};

// window属性注册机
export const winRegister = (key, val) => {
  if (winKeys[key] == null) {
    console.warn('未定义的win_key:', key);
    return;
  }
  window[key] = val;
};
