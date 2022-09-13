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
   * 获取asset路径
   */
  getAssetUrl(url) {
    return new URL(`../assets/${url}`, import.meta.url);
  },
  /**
   * 复制到剪切板
   * 这种方式针对pc端，仍然比较好用
   */
  copy(val) {
    if (val == null || val === '') {
      $message.warning('值为空');
      return;
    }
    val += '';
    const input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', val);
    document.body.appendChild(input);
    input.setSelectionRange(0, val.length);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    $message.success('复制成功！');
  }
};
