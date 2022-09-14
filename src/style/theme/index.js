/* eslint-disable no-undef */
import {
  compactThemeSingle,
  getThemeVariables
} from 'ant-design-vue/dist/theme';
// 设置require.resolve，否则无法执行getThemeVariables
const g = globalThis;
if (g.require == null) {
  g.require = {
    resolve(url) {
      return url;
    }
  };
}
/**
 * 提供给modifyVars，以支持本地theme切换
 */
export default {
  // default: {
  //   'primary-color': '#1890ff', // 全局主色
  //   'link-color': '#1890ff', // 链接色
  //   'success-color': '#52c41a', // 成功色
  //   'warning-color': '#faad14', // 警告色
  //   'error-color': '#f5222d', // 错误色
  //   'font-size-base': '12px', // 主字号
  //   'heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
  //   'text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
  //   'text-color-secondary': 'rgba(0, 0, 0, 0.45)', // 次文本色
  //   'disabled-color': 'rgba(0, 0, 0, 0.25)', // 失效色
  //   'border-radius-base': '4px', // 组件/浮层圆角
  //   'border-color-base': '#d9d9d9', // 边框色
  //   'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)' // 浮层阴影
  // },
  // 默认、紧凑【可换肤】
  // -- 经测试：搭配开启main.js里'ant-design-vue/dist/antd.variable.less'，则默认可换肤
  // -- 也可以禁用modifyVars，使用官网推荐的variable.min.css
  'default': {},
  'compact': compactThemeSingle,
  // 暗黑、暗黑紧凑【不可换肤】
  'dark': getThemeVariables({ dark: true }),
  'dark-compact': Object.assign(
    {},
    getThemeVariables({ dark: true }),
    compactThemeSingle
  )
};

/**
 * 切换theme
 * -- 目前采取全量引入theme，通过disabled切换【网速慢首次白屏会长】
 */
export function changeTheme(theme) {
  let links = document.getElementsByName('dynamic-theme');
  let activeLink = document.getElementById(`dynamic-theme-${theme}`);
  // 禁用动画
  document.body.classList.add('g-ignore-ani');

  // 切换
  activeLink.removeAttribute('disabled');
  setTimeout(() => {
    links.forEach((item) => {
      if (item.id !== `dynamic-theme-${theme}`) {
        item.setAttribute('disabled', true);
      }
    });
    // 重新开启动画
    document.body.classList.remove('g-ignore-ani');
  }, 50);
}

/**
 * 切换theme
 * -- 动态切换link【网速慢效果不佳】
 */
function insterAfter(targetElement, newElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}
export function changeThemeDynamic(theme) {
  let link = document.getElementById('dynamic-theme');
  let head = document.getElementsByTagName('head')[0];
  if (link) {
    const url = `./theme/antd.${theme}.min.css`;
    // 禁用动画
    document.body.classList.add('g-ignore-ani');
    // 创建新样式，追加到link后面
    let newLink = document.createElement('link');
    newLink.setAttribute('type', 'text/css');
    newLink.setAttribute('rel', 'stylesheet');
    newLink.setAttribute('href', url);
    newLink.onload = newLink.readystatechange = function () {
      if (!newLink.readyState || /loaded|complete/.test(newLink.readyState)) {
        // 替换
        head.removeChild(link);
        newLink.setAttribute('id', 'dynamic-theme');
        // 重新开启动画
        setTimeout(() => {
          document.body.classList.remove('g-ignore-ani');
        }, 50);
      }
    };
    newLink.onerror = function () {
      console.error('change theme error:', url);
      $message.error('主题切换失败，请检查网络！');
      // 删除newlink
      head.removeChild(newLink);
      // 重新开启动画
      document.body.classList.remove('g-ignore-ani');
    };
    insterAfter(link, newLink);
  }
}

// 去除color属性
// export const colorless = (themeObj = {}) => {
//   const variable = ['primary-color', 'error-color', 'warning-color', 'success-color', 'info-color'];

//   // 递归检查是否最终引用了variable
//   function deepCheck(val) {
//     const matches = val != null ? (val + '').match(/(?<=@\{*)([\w\d-]+)(?=\}*)/g) : [];
//     let flag = [];
//     (matches || []).forEach((pKey, index) => {
//       if (variable.includes(pKey)) {
//         flag[index] = true;
//       } else {
//         flag[index] = deepCheck(themeObj[pKey]);
//       }
//     });
//     return flag.includes(true);
//   }

//   const res = { hack: themeObj.hack };
//   for (let [key, val] of Object.entries(themeObj)) {
//     if (!variable.includes(key) && !deepCheck(val)) {
//       res[key] = val;
//     }
//   }
//   delete res['theme'];
//   // console.log(res)
//   return res;
// };

// less打包脚本
// function createShell() {
//   const vars = [];
//   for (let [key, val] of Object.entries(getThemeVariables({ compact: true }))) {
//     vars.push(`--modify-var='${key}=${val}'`)
//   }
//   return `lessc --js ${vars.join(' ')} ./node_modules/ant-design-vue/dist/antd.variable.less ./src/style/theme/variable.css`.replace(/[\r\n]/g, '');
// }
