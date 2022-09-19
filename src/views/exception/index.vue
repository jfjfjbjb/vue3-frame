<template>
  <div class="page-exception">
    <!-- 后续可扩展错误态 -->
    <a-result
      status="404"
      title="404"
      sub-title="Sorry, the page you visited does not exist."
    >
      <template #extra>
        <a-button type="primary" @click="toHome">回到首页</a-button>
      </template>
    </a-result>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
console.log('Exception pathMatch: ', route.params.pathMatch);

// methods
function toHome() {
  router.push({
    name: 'home'
  });
}
</script>

<style scoped lang="less"></style>
