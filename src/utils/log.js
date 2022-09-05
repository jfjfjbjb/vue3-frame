/**
 * 全局log
 * （已注册于window，无需引入）
 */

export default {
  // group
  group(tips, values = {}) {
    console.group(`${tips}`);
    _.forEach(values, (item, key) => {
      console.info(`${key}:`, item);
    });
    console.groupEnd();
  }
};
