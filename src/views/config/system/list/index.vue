<template>
  <div class="page-home-list">
    <div>this is config/system page list</div>
    <a-space>
      <a-button size="small" @click="() => counter++">{{ counter }}添加+</a-button>
      <a-button size="small" type="primary" @click="onAdd">前往新增</a-button>
    </a-space>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

// data
const counter = ref(0);

// methods
function onAdd() {
  router.push({
    name: 'configSystemAdd'
  });
}
</script>

<style scoped lang="less"></style>
