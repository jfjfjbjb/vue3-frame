<template>
  <div class="example-theme">
    <a-card hoverable title="定制主题">
      <a-alert type="info" showIcon>
        <template #message>
          <div>满足大多网站需求，build上线后无法修改，但可以不全量引入antd样式</div>
        </template>
      </a-alert>
      <!-- suggest -->
      <ol class="g-suggest">
        <li>main.js: 去除全局引入antd样式</li>
        <li>vite.config.js: AntDesignVueResolver.importStyle = less，动态引入组件样式</li>
        <li>utils/window.js: 打开全局组件样式import</li>
        <li>style/theme/index.js: 根据需求配置theme，配置到modifyVars即可</li>
        <li class="summary">综上所述：去除全局样式 -> 开启局部样式 -> 配置所需theme</li>
      </ol>
    </a-card>
    <a-card hoverable title="动态主题">
      <a-alert type="success" showIcon>
        <template #message>
          <div>页面效果更丰富，上线后可动态修改，需全量引入antd样式</div>
        </template>
      </a-alert>
      <div class="dynamic-operate">
        <a-radio-group v-model:value="currTheme" @change="onChangeTheme">
          <a-radio value="default">默认</a-radio>
          <a-radio value="compact">紧凑</a-radio>
          <a-radio value="dark">暗黑</a-radio>
        </a-radio-group>
      </div>
    </a-card>
  </div>
</template>

<script lang="jsx" setup>
import { ref } from 'vue';
import { ConfigProvider } from 'ant-design-vue';

// data
const currTheme = ref('compact');

// methods
function onChangeTheme(e) {
  // 测试换肤
  ConfigProvider.config({
    theme: {
      primaryColor: 'red'
    }
  });
}
</script>

<style scoped lang="less">
.example-theme {
  .dynamic-operate {
    margin-top: 8px;
  }
}
</style>
