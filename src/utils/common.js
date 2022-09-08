/**
 * 全局通用方法
 * （已注册于window，无需引入）
 */
export default {
  /**
   * 请求返回code是否合法
   */
  isSuccessCode(res) {
    const code = _.get(res, 'data.code');
    if ([0].includes(code)) {
      return true;
    }
  },
  /**
   * 获取assets路径
   */
  getAssetsSrc(src) {
    return new URL(`../assets/${src}`, import.meta.url)
  }
}