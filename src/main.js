import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import components from './components/index';
import './config';
import './style/index.less';

const app = createApp(App);
app.use(createPinia());
app.use(router);

// 注册全局组件
_.forEach(components, (item, key) => {
  if (item && item._default === false) {
    app.component(item.name, item.comp);
    return;
  }
  app.component(
    `custom${key.replace(/[A-Z]/g, ($0) => {
      return '-' + $0.toLowerCase();
    })}`,
    item
  );
});

app.mount('#app');
