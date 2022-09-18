<template>
  <div class="page-home-list">
    <div>this is config/system page list</div>
    <a-button size="small" @click="onAdd">前往新增</a-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
// methods
function onAdd() {
  router.push({
    name: 'configSystemAdd'
  });
}
</script>

<style scoped lang="less"></style>
