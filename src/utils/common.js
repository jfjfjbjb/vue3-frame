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
   * 获取地址栏参数
   */
  getQueryParams(url, name) {
    let path = url || window.location.href;
    let match = path.match(/(\?[^/#]*)/gi);
    let map = {};
    if (match) {
      match.forEach((matchItem) => {
        matchItem
          .slice(1)
          .split('&')
          .map((item) => {
            let keyVal = item.split('=');
            map[keyVal[0]] = decodeURIComponent(keyVal[1]);
          });
      });
    }
    if (name) return map[name];
    return map;
  },
  /**
   * 下载
   */
  download(res) {
    const contentType = _.get(res, 'headers.content-type').toLowerCase();
    if (contentType === 'application/json' && !this.isSuccessCode(res)) {
      let reader = new FileReader();
      reader.onload = (e) => {
        try {
          const realRes = JSON.parse(e.target.result);
          $loading.hide({ method: 'error', tips: _.get(realRes, 'message') });
        } catch (e) {
          console.error(e);
          $loading.hide({ method: 'error', tips: _.get(res, 'data.message') });
        }
      };
      reader.readAsText(res.data);
      return;
    }
    $loading.hide({ useMessage: true, tips: '下载成功！' });
    this.downloadByBlob(res);
  },
  downloadByBlob(response) {
    // 提取filename
    const filename = response.headers['content-disposition']
      .match(/filename=(.*)/)[1]
      .replace(new RegExp('"', 'g'), '');
    // 转换为blob
    const blob = new Blob(response.data, {
      type: 'application/octet-stream'
    });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // 兼容ie：以本地方式保存文件
      window.navigator.msSaveBlob(blob, filename);
    } else {
      const blobURL = window.URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      tempLink.setAttribute('download', filename);
      if (typeof tempLink.download === 'undefined') {
        // 兼容某些浏览器不兼容download属性
        tempLink.setAttribute('target', '_blank');
      }
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    }
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
