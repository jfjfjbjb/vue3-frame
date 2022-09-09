/* eslint-disable no-undef */
import { compactThemeSingle, getThemeVariables } from 'ant-design-vue/dist/theme';
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
  'dark-compact': Object.assign({}, getThemeVariables({ dark: true }), compactThemeSingle)
};

/**
 * 切换theme 
 */
export function changeTheme(theme) {
  let link = document.getElementById('dynamic-theme');
  if(link) {
    link.href = `./theme/antd.${theme}.min.css`;
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
