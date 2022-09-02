<template>
  <a-layout class="page-help" style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo"><Logo /></div>
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        @click="onClick"
      >
        <!-- common -->
        <a-sub-menu key="common">
          <template #title>
            <span>
              <fire-outlined />
              <span>公用示例</span>
            </span>
          </template>
          <a-menu-item v-for="item in example.common" :key="item.key">{{
            item.name
          }}</a-menu-item>
        </a-sub-menu>
        <!-- private -->
      </a-menu>
    </a-layout-sider>
    <a-layout style="padding: 24px">
      <component :is="activeExample" />
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref, computed } from 'vue';
import Logo from '@/assets/logo.svg?component';
import { FireOutlined } from '@ant-design/icons-vue';
import exampleComps from './example';

const collapsed = ref(false);
const openKeys = ref(['common']);
const selectedKeys = ref(['Playground']);
const example = ref({
  common: [
    {
      key: 'Playground',
      name: 'Playground'
    },
    {
      key: 'Form',
      name: 'Form'
    }
  ]
});

// computed
const activeExample = computed(() => {
  return exampleComps[selectedKeys.value[0]];
});

// methods
function onClick({ item, key, keyPath }) {
  console.log(item, key, keyPath, 'click-menu-item');
}
</script>

<style scoped lang="less">
.page-help {
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
    background-image: linear-gradient(135deg, #0b2b18 10%, #022b6b 100%);

    > svg {
      height: 50%;
    }
  }
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>

<style lang="less">
.example-content {
  display: flex;

  > div:first-child {
    flex-grow: 1;
  }

  .anchor {
    flex-shrink: 0;
    padding: 0 8px;

    .ant-anchor-wrapper {
      .ant-anchor-ink::before {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
  }
}
</style>
