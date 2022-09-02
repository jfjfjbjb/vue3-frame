<template>
  <a-config-provider :locale="locale">
    <div id="entry">
      <RouterView />
    </div>
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
});
</script>

<style scoped lang="less"></style>
