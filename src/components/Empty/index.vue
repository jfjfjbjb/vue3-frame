<template>
  <a-empty class="custom-empty" v-bind="attrs"></a-empty>
</template>

<script setup>
import { useAttrs, computed } from 'vue';
import { Empty } from 'ant-design-vue';

/** computed */
const attrs = computed(() => {
  return Object.assign(
    { description: '暂无数据', image: Empty.PRESENTED_IMAGE_SIMPLE },
    useAttrs()
  );
});
</script>

<style scoped lang="less">
  .custom-empty {
    margin: 12px 0;
  }
</style>
