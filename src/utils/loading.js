/**
 * 全局loading
 * （已注册于window，无需引入）
 */
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default ({ LOADING = {} }) => {
  const msgKey = 'global_message_key';
  const { BASE = {} } = LOADING;
  NProgress.configure(BASE);

  return {
    show(params = {}) {
      const { useMessage = false, tips } = params;
      if (useMessage) {
        $message.loading({ content: tips || '请求中...', key: msgKey });
      } else {
        NProgress.start();
      }
    },
    hide(params = {}) {
      const { useMessage = false, method, tips, errTitle } = params;
      if (method && method !== 'success') {
        // 非成功时，使用notification显示信息
        $notification[method || 'error']({
          message: errTitle || '请求失败',
          description: tips || ''
        });
        NProgress.done();
        $message.destroy();
        return;
      }
      if (useMessage) {
        $message[method || 'success']({
          content: tips || '请求完成！',
          key: msgKey
        });
      } else {
        $message.destroy();
      }
      NProgress.done();
    }
  };
};
