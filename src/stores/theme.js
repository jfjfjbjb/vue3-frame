import { defineStore } from 'pinia';

export const useThemeStore = defineStore({
  id: 'theme',
  state: () => ({
    theme: ''
  }),
  actions: {
    setTheme(val = '') {
      this.theme = val;
    }
  }
});
