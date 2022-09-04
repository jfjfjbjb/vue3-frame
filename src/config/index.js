import wins from './window';

const config = {
  // 项目
  PROJECT: {
    CODE: 'vue3-frame',
    NAME: 'vue3-frame',
  },
  // loading
  LOADING: {
    BASE: {
      showSpinner: false
    }
  }
};

// 注册window
wins(config);

export default config;