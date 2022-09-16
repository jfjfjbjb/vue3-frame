<template>
  <a-config-provider :locale="locale">
    <!-- 统一empty -->
    <template #renderEmpty>
      <custom-empty></custom-empty>
    </template>
    <!-- router -->
    <div id="entry">
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
import { ref, onMounted } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import { winRegister, winKeys } from './utils/window';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
const locale = ref(zhCN);

// data
const maskVisible = ref(false);

// life circle
onMounted(() => {
  console.log('App Loaded!!');

  // resize
  window.addEventListener('resize', (e) => {
    $bus.emit('window-resize', e);
  });
});

// methods
function showMask() {
  maskVisible.value = true;
  document.body.style.overflow = 'hidden';
}
function hideMask() {
  maskVisible.value = false;
  document.body.style.overflow = 'visible';
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
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.05);
  cursor: not-allowed;
  z-index: @zindex-mask;
}
</style>
