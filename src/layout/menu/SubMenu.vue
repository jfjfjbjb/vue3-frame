<template>
  <!-- menu-item -->
  <template v-if="!menuInfo.children || menuInfo.children.length <= 0">
    <a-menu-item :key="menuInfo.key">
      <template #icon>
        <component :is="menuInfo.icon" />
      </template>
      {{ menuInfo.title }}
    </a-menu-item>
  </template>
  <!-- sub-menu -->
  <a-sub-menu :key="menuInfo.key" v-else>
    <template #icon><component :is="menuInfo.icon" /></template>
    <template #title>{{ menuInfo.title }}</template>
    <template v-for="item in menuInfo.children" :key="item.key">
      <sub-menu :menu-info="item" />
    </template>
  </a-sub-menu>
</template>

<script>
import { defineComponent } from 'vue';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'SubMenu',
  // icon 目前选用antd-icons，如果新增菜单icon，必须在此处动态增加
  // -- 后续可采用自己的iconfont
  components: { HomeOutlined, SettingOutlined },
  props: {
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    return {};
  }
});
</script>
