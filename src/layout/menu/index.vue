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
import { defineComponent, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import SubMenu from './SubMenu.vue';
import config from './config';

export default defineComponent({
  components: {
    'sub-menu': SubMenu
  },
  props: {
    collapsed: Boolean
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    let selectedKeys = ref([]);
    let openKeys = ref([]);

    // watch
    watch(
      route,
      (newVal, oldVal) => {
        selectedKeys.value = getSelectedKeys(newVal);
        if (!props.collapsed) {
          openKeys.value = getOpenKeys(newVal);
        }
      },
      {
        immediate: true
      }
    );

    // methods
    function onMenuClick({ item, key, keyPath }) {
      router.push({
        name: key
      });
    }
    function getSelectedKeys(route) {
      const { meta = {} } = route;
      // const { _parent: parent } = meta;
      const parent = meta._parent;

      if (meta.isEntry) {
        return [route.name];
      }
      if (parent) {
        return [parent.name];
      }
      return [];
    }
    function getOpenKeys(route) {
      const keys = [];

      function recursion(route) {
        const { meta = {} } = route;
        // const { _parent: parent } = meta;
        const parent = meta._parent;

        if (parent) {
          // parent.path === 'null' && keys.push(parent.name);
          parent.children && parent.children.length > 0 && keys.push(parent.name);
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
