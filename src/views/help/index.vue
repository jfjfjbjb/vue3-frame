<template>
  <a-layout class="page-help" style="min-height: 100vh">
    <a-layout-sider
      :class="[themeTrans && 'g-ignore-ani']"
      v-model:collapsed="collapsed"
      collapsible
      :theme="theme"
    >
      <div class="logo ani-shiny" @click="onChangeTheme"><Logo /></div>
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        :theme="theme"
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
      <!-- keep-alive本地开发热更新报错，还未解决 https://github.com/vuejs/core/issues/6222 -->
      <keep-alive>
        <component :is="activeExample" :key="selectedKeys[0]" />
      </keep-alive>
      <!-- <component :is="activeExample" :key="selectedKeys[0]" /> -->
    </a-layout>
  </a-layout>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { ref, computed, nextTick } from 'vue';
import Logo from '@/assets/logo.svg?component';
// import { FireOutlined } from '@ant-design/icons-vue';
import exampleComps from './example';

// data
const theme = ref('dark');
const themeTrans = ref(false);
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
      key: 'Request',
      name: 'Request'
    },
    {
      key: 'Theme',
      name: 'Theme'
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
  console.log('onClick -> { item, key, keyPath }', { item, key, keyPath });
}
function onChangeTheme() {
  themeTrans.value = true;
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  setTimeout(() => {
    themeTrans.value = false;
  });
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
    cursor: pointer;
    > svg {
      height: 50%;
    }
  }

  // 测试deep；后续theme的切换请使用less变量的方式
  :deep(.ant-layout-sider) {
    &.ant-layout-sider-light {
      .logo {
        background-image: linear-gradient(135deg, #e1a4d3 10%, #cef9ce 100%);
      }
    }
    &.ant-layout-sider-dark {
      .logo {
        background-image: linear-gradient(135deg, #0b2b18 10%, #022b6b 100%);
      }
    }
  }
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
