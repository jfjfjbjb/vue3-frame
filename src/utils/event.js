/**
 * 全局event bus
 * （已注册于window，无需引入）
 */
import mitt from 'mitt';
const bus = mitt();

export default {
  on() {
    bus.on(...arguments);
  },
  emit() {
    bus.emit(...arguments);
  },
  off() {
    bus.off(...arguments);
  }
};
