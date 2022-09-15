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
    <!-- back-top -->
    <a-back-top style="right: 20px" />
  </a-config-provider>
</template>

<script lang="jsx" setup>
import { ref, onMounted } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
const locale = ref(zhCN);

// life circle
onMounted(() => {
  console.log('App Loaded!!');
  
  // resize
  window.addEventListener('resize', (e) => {
    $bus.emit('window-resize', e);
  });
});
</script>

<style scoped lang="less"></style>
