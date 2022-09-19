<template>
  <a-config-provider :locale="locale">
    <!-- 统一empty -->
    <template #renderEmpty>
      <custom-empty></custom-empty>
    </template>
    <!-- router -->
    <div id="entry" :class="[theme]">
      <RouterView />
    </div>
    <!-- 蒙层 -->
    <div
      class="entry-mask ani-progress"
      :style="{ display: maskVisible ? 'block' : 'none' }"
    ></div>
    <!-- back-top -->
    <a-back-top style="right: 20px" />
  </a-config-provider>
</template>

<script lang="jsx" setup>
import { ref, computed, onMounted } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import { winRegister, winKeys } from './utils/window';
import 'dayjs/locale/zh-cn';
import { useThemeStore } from './stores/theme';
import { GLOBAL } from './utils/event';
dayjs.locale('zh-cn');
const locale = ref(zhCN);

// eslint-disable-next-line no-undef
console.log('Env.theme:', __THEME__ || '--');

// data
const maskVisible = ref(false);

// computed
const theme = computed(() => {
  const themeStore = useThemeStore();
  return `theme-${themeStore.theme || 'compact'}`;
});

// life circle
onMounted(() => {
  console.log('App Loaded!!');

  // resize
  window.addEventListener('resize', (e) => {
    $bus.emit(GLOBAL.WINDOW_RESIZE, e);
  });
});

// methods
function showMask() {
  let html = document.documentElement;
  maskVisible.value = true;
  html.style.overflow = 'hidden';
}
function hideMask() {
  let html = document.documentElement;
  maskVisible.value = false;
  html.style.overflow = 'auto';
}

// expose
let exposeObj = {
  showMask,
  hideMask
};
defineExpose(exposeObj);
// 注册windows全局属性
winRegister(winKeys.$ENTRY, exposeObj);
</script>

<style scoped lang="less">
.entry-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.05);
  cursor: not-allowed;
  z-index: @zindex-mask;
}
</style>
