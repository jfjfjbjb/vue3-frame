<template>
  <a-menu
    :openKeys="openKeys"
    :selectedKeys="selectedKeys"
    mode="inline"
    theme="light"
    @click="onMenuClick"
  >
    <template v-for="item in list" :key="item.key">
      <sub-menu :menu-info="item" />
    </template>
  </a-menu>
</template>
<script>
import { defineComponent, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import SubMenu from './SubMenu.vue';
import config from './config';

export default defineComponent({
  components: {
    'sub-menu': SubMenu
  },

  setup() {
    const router = useRouter();
    const route = useRoute();

    // computed
    const openKeys = computed(() => {
      return getOpenKeys();
    });
    const selectedKeys = computed(() => {
      return getSelectedKeys();
    });

    // methods
    function onMenuClick({ item, key, keyPath }) {
      router.push({
        name: key
      });
    }
    function getSelectedKeys() {
      const parent = _.get(route, 'meta._parent');
      if (!parent) {
        return [route.name];
      }
      return [
        (parent.children.find((item) => _.get(item, 'meta.isEntry')) || {}).name
      ];
    }
    function getOpenKeys() {
      const keys = [];
      function recursion(route) {
        const parent = _.get(route, 'meta._parent');
        if (parent) {
          keys.push(parent.name);
          recursion(parent);
        }
      }
      recursion(route);
      return keys;
    }

    return {
      list: config.menus,
      selectedKeys,
      openKeys,
      onMenuClick
    };
  }
});
</script>
