<template>
  <div class="example-request">
    <a-card title="获取数据">
      <template #extra>
        <a-button @click="onGetData" size="small">执行</a-button>
      </template>
      <a-spin :spinning="loading">
        <code v-if="getRes">{{ getRes }}</code>
        <custom-empty v-else />
      </a-spin>
    </a-card>
    <a-card title="提交数据">
      <template #extra>
        <a-button @click="onSubmit" size="small">执行</a-button>
      </template>
      <a-alert type="info" message="请注意顶部进度条" showIcon />
    </a-card>
  </div>
</template>

<script lang="jsx" setup>
import {
  apiGet
  // apiPost,
  // apiText
} from '@/api/test';
import { ref } from 'vue';
// data
const loading = ref(false);
const getRes = ref();

// methods
const onGetData = function () {
  // 获取请求
  loading.value = true;
  apiGet({ a: 111 })
    .then((res) => {
      loading.value = false;
      if ($common.isSuccessCode(res)) {
        getRes.value = JSON.stringify(_.get(res, 'data.data'));
      } else {
        $loading.hide({ method: 'error', tips: _.get(res, 'data.message') });
      }
    })
    .catch((e) => {
      console.log(e);
      loading.value = false;
      $loading.hide({ method: 'error', tips: '请求失败' });
    });
};

const onSubmit = function () {
  // 提交请求
  $loading.show();
  apiGet({ a: 111 })
    .then((res) => {
      if ($common.isSuccessCode(res)) {
        $loading.hide();
      } else {
        $loading.hide({ method: 'error', tips: _.get(res, 'data.message') });
      }
    })
    .catch((e) => {
      console.log(e);
      $loading.hide({ method: 'error', tips: '请求失败' });
    });
};
</script>

<style scoped lang="less"></style>
