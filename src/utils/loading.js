/**
 * 全局loading
 * （已注册于window，无需引入）
 */
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default ({ LOADING = {} }) => {
  const { BASE = {} } = LOADING;
  NProgress.configure(BASE);

  // TODO
  return {
    show() {
      NProgress.start();
    },
    hide() {
      NProgress.done();
    }
  };
};
