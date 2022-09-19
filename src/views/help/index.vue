<template>
  <a-layout class="page-help" style="min-height: 100vh" @click="onPageHelp">
    <a-layout-sider
      :class="[themeTrans && 'g-ignore-ani']"
      v-model:collapsed="collapsed"
      collapsible
      :theme="theme"
    >
      <div class="logo ani-shiny" @click="onChangeTheme"><Logo /></div>
      <menu-outlined class="adpt-display-sm" @click.stop="onToggleMenu" />
      <a-menu
        :style="{ display: menuVisible ? 'block' : 'none' }"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        :theme="theme"
        mode="inline"
        @click="onClick"
      >
        <!-- common -->
        <a-sub-menu key="common" @click.stop="() => {}">
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
      <Transition>
        <!-- keep-alive本地开发热更新报错，还未解决 https://github.com/vuejs/core/issues/6222 -->
        <keep-alive>
          <component :is="activeExample" :key="selectedKeys[0]" />
        </keep-alive>
      </Transition>
      <!-- <component :is="activeExample" :key="selectedKeys[0]" /> -->
    </a-layout>
  </a-layout>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import Logo from '@/assets/logo.svg?component';
// import { FireOutlined } from '@ant-design/icons-vue';
import exampleComps from './example';
import { useThemeStore } from '@/stores/theme';
import { GLOBAL } from '@/utils/event';
const themeStore = useThemeStore();
let resizeEvent = null;

// data
const theme = ref('dark');
const themeTrans = ref(false);
const collapsed = ref(false);
const openKeys = ref(['common']);
const selectedKeys = ref(['Playground']);
const menuVisible = ref(!isMobile());
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
    }
    // {
    //   key: 'Form',
    //   name: 'Form'
    // }
  ]
});

// computed
const activeExample = computed(() => {
  return exampleComps[selectedKeys.value[0]];
});

// life circle
onUnmounted(() => {
  if (resizeEvent) {
    $bus.off(GLOBAL.WINDOW_RESIZE, resizeEvent);
  }
});
onMounted(() => {
  // resize
  $bus.on(
    GLOBAL.WINDOW_RESIZE,
    (resizeEvent = (e) => {
      if (isMobile()) {
        if (menuVisible.value) {
          menuVisible.value = false;
        }
      } else {
        if (!menuVisible.value) {
          menuVisible.value = true;
        }
      }
    })
  );
});

// methods
function onChangeTheme() {
  themeTrans.value = true;
  theme.value = themeStore.theme.includes('dark')
    ? 'dark'
    : theme.value === 'dark'
    ? 'light'
    : 'dark';
  setTimeout(() => {
    themeTrans.value = false;
  });
}
function onClick({ item, key, keyPath }) {
  console.log('onClick -> { item, key, keyPath }', { item, key, keyPath });
  if (isMobile()) {
    menuVisible.value = false;
  }
}
function onPageHelp(e) {
  if (isMobile()) {
    menuVisible.value = false;
  }
}
function onToggleMenu() {
  menuVisible.value = !menuVisible.value;
}
function isMobile() {
  return window.innerWidth < 750;
}

// watch
watch(
  () => themeStore.theme,
  (newVal, oldVal) => {
    if (newVal && newVal.includes('dark')) {
      theme.value = 'dark';
    }
  },
  {
    immediate: true
  }
);
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

  :deep(.ant-layout-sider) {
    &.ant-layout-sider-light {
      .logo {
        background-image: linear-gradient(135deg, #e1a4d3 10%, #cef9ce 100%);
      }
      .anticon-menu {
        color: #000 !important;
      }
    }
    &.ant-layout-sider-dark {
      .logo {
        background-image: linear-gradient(135deg, #0b2b18 10%, #022b6b 100%);
      }
    }
  }
}

// transition
@delay: 0.4s;
// .v-enter-from{
// }
.v-enter-active {
  transition: all 0.1s ease @delay;
  // opacity: 0;
  display: none;
}
.v-enter-to {
  // opacity: 1;
}

.v-leave-active {
  transition: all @delay ease;
}
.v-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

<style lang="less">
// example-content: 左侧内容,右侧anchor
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

// 小屏幕适配
@media only screen and (max-width: 750px) {
  .page-help.ant-layout {
    flex-direction: column;
    > .ant-layout-sider,
    > .ant-layout {
      max-width: none !important;
      width: 100% !important;
    }

    > .ant-layout-sider {
      flex-basis: 64px !important;
      padding-bottom: 0;

      .ant-layout-sider-children {
        display: flex;
        justify-content: space-between;
        align-items: center;
        > .logo {
          width: 50px;
        }
        > .anticon-menu {
          font-size: 18px;
          color: white;
          padding: 16px;
          cursor: pointer;
        }
        > .ant-menu {
          position: absolute;
          top: 64px;
          right: 0;
          display: none;
          z-index: 1;
          padding-bottom: 12px;
          width: 200px;
        }
      }
    }
    .anchor,
    .ant-layout-sider-trigger {
      display: none;
    }
  }
}
</style>
