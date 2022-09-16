<template>
  <div class="layout-root">
    <!-- 顶部布局 -->
    <Top />
    <!-- TODO -->
  </div>
</template>

<script lang="jsx" setup>
import Top from './subLayouts/Top/index.vue';
</script>

<style scoped lang="less"></style>
<style lang="less">
.layout-root {
  min-width: 800px;
}
.layout-sub {
  min-height: 100vh;

  .ant-layout-header {
    padding: 0 24px;
  }
}

// 小屏幕适配
@media only screen and (max-width: 800px) {
  .layout-root {
    .ant-layout-sider-trigger {
      position: absolute;
    }
  }
}
</style>
