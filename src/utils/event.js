/**
 * 全局event bus
 * （已注册于window.$bus，无需引入）
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

/**
 * 事件名称
 * -- GLOBAL：全局事件
 * -- ！其余事件名，也请统一处理
 */
export const GLOBAL = {
  // window窗口变化
  WINDOW_RESIZE: 'WINDOW_RESIZE'
}
