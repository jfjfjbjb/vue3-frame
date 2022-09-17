<template>
  <div class="example-theme">
    <a-card hoverable title="本地切换">
      <a-alert type="success" showIcon>
        <template #message>
          <div>满足大多网站需求，上线后无法修改，但可避免全量引入antd样式</div>
        </template>
      </a-alert>
      <!-- suggest -->
      <ol class="g-suggest">
        <li>main.js: 去除全局引入antd样式 | index.html: 去除样式引入</li>
        <li>vite.config.js: AntDesignVueResolver.importStyle = less，动态引入组件样式</li>
        <li>utils/window.js: 打开全局组件样式import</li>
        <li>style/theme/index.js: 根据需求配置theme，配置到modifyVars即可</li>
        <li class="summary">综上所述：去除全局样式 -> 开启局部样式 -> 配置所需theme</li>
      </ol>
    </a-card>
    <a-card hoverable title="线上切换">
      <a-alert type="info" showIcon>
        <template #message>
          <div>目前开启了该模式，本系统采取了动态修改link，未采用官方推荐global-config方式</div>
        </template>
      </a-alert>
      <div class="dynamic-operate">
        <a-radio-group v-model:value="currTheme" @change="onChangeTheme">
          <a-radio value="variable">默认【该模式可调主题色】</a-radio>
          <a-radio value="dark">暗黑</a-radio>
          <a-radio value="compact">紧凑</a-radio>
          <a-radio value="dark-compact">暗黑-紧凑</a-radio>
        </a-radio-group>
      </div>
    </a-card>
    <a-card hoverable title="主题色">
      <a-alert type="info" showIcon>
        <template #message>
          <div>只有variable样式可调色</div>
        </template>
      </a-alert>
      <div class="dynamic-operate">
        <custom-input
          type="color"
          :value="colorState.primaryColor"
          @input="(e) => onChangeColor('primaryColor', e)"
        ></custom-input>
      </div>
    </a-card>
  </div>
</template>

<script lang="jsx" setup>
import { ref, reactive } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import { changeTheme } from '@/style/theme';

// data
const currTheme = ref('compact');
const colorState = reactive({
  primaryColor: '#1890ff'
  // errorColor: '#ff4d4f',
  // warningColor: '#faad14',
  // successColor: '#52c41a',
  // infoColor: '#1890ff'
});

// methods
function onChangeTheme(e) {
  changeTheme(e.target.value);
}
function onChangeColor(type, value) {
  Object.assign(colorState, { [type]: value });
  ConfigProvider.config({
    theme: colorState
  });
}
</script>

<style scoped lang="less">
.example-theme {
  .dynamic-operate {
    margin-top: 8px;

    input {
      width: 100px;
    }
  }
}
</style>
