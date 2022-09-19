<template>
  <a-layout class="layout-sub layout-sub-top">
    <a-layout-header class="header">
      <div class="logo" />
      <!-- <a-menu
        v-model:selectedKeys="selectedKeys1"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu> -->
      <a-button type="primary" @click="toHelp">前往Help</a-button>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        width="200"
        style="background: #fff"
        theme="light"
        v-model:collapsed="collapsed"
        collapsible
      >
        <Menu :collapsed="collapsed" />
        <!-- <a-menu
          v-model:selectedKeys="selectedKeys2"
          v-model:openKeys="openKeys"
          mode="inline"
          theme="light"
          :style="{ height: '100%', borderRight: 0 }"
          @click="onMenuClick"
        >
          <a-menu-item key="home">首页</a-menu-item>
          <a-sub-menu key="config">
            <template #title>
              <span>
                <laptop-outlined />
                <span>配置管理</span>
              </span>
            </template>
            <a-menu-item key="configSystem">系统配置</a-menu-item>
          </a-sub-menu>
        </a-menu> -->
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <!-- 后续可以开发点击功能，但需要注意路由参数 -->
          <a-breadcrumb-item v-for="item in navis" :key="item.name">{{
            item?.meta?.desc || ''
          }}</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px'
          }"
        >
          <!-- keep-alive本地开发热更新报错，还未解决 https://github.com/vuejs/core/issues/6222 -->
          <router-view v-slot="{ Component }">
            <Transition>
              <keep-alive :include="keepAliveIncludes">
                <component :is="Component" />
              </keep-alive>
            </Transition>
          </router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="jsx" setup>
import { ref, onMounted, computed } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import { changeTheme } from '@/style/theme';
import { useThemeStore } from '@/stores/theme';
import Menu from '@/layout/menu/index.vue';
import { routeMap } from '@/router/config';
const route = useRoute();
const router = useRouter();

// data
const collapsed = ref(false);

// computed
const navis = computed(() => {
  return (_.get(route, 'meta.navi') || [])
    .map((key) => {
      return routeMap[key];
    })
    .filter((item) => item);
});
const keepAliveIncludes = computed(() => {
  const res = (_.get(route, 'meta.navi') || []).map(key => {
    const routeItem = routeMap[key];
    if (routeItem && _.get(routeItem, 'meta.keepAlive')) {
      return key;
    }
  }).filter(item => item);

  return res;
});


// life circle
onMounted(() => {
  const themeStore = useThemeStore();
  // 由于theme换肤暂时只在help里完成，所以这里强制设置为compact
  themeStore.theme.includes('dark') && changeTheme('compact');
});

// methods
function toHelp() {
  router.push({
    name: 'help'
  });
}
</script>

<style scoped lang="less">
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
</style>
