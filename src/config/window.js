import _ from 'lodash';
import { message } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/css';
import mitt from 'mitt';

// lodash
window._ = _;
// antd $message
window.$message = message;
// event bus
window.$bus = mitt();