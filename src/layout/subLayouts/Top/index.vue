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
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        width="200"
        style="background: #fff"
        theme="light"
        v-model:collapsed="collapsed"
        collapsible
      >
        <a-menu
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
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px'
          }"
        >
          <RouterView></RouterView>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="jsx" setup>
import { ref, onMounted } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { changeTheme } from '@/style/theme';
import { useThemeStore } from '@/stores/theme';
const router = useRouter();

// data
// const selectedKeys1 = ref(['2']);
const selectedKeys2 = ref(['home']);
const openKeys = ref(['']);
const collapsed = ref(false);

// life circle
onMounted(() => {
  const themeStore = useThemeStore();
  // 由于theme换肤暂时只在help里完成，所以这里强制设置为compact
  themeStore.theme.includes('dark') && changeTheme('compact');
});

// methods
function onMenuClick({ item, key, keyPath }) {
  router.push({
    name: key
  });
}
</script>

<style scoped lang="less">
.logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
</style>
