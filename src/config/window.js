import _ from 'lodash';
import { message } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/css';
import mitt from 'mitt';
import loading from '@/utils/loading';

export default (config = {}) => {
  // config
  window.$config = config;
  // lodash
  window._ = _;
  // global loading
  window.$loading = loading(config);
  // event bus
  window.$bus = mitt();
  // antd $message
  window.$message = message;
}