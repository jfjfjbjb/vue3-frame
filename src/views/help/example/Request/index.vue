<template>
  <div class="example-request">
    <a-card hoverable title="获取数据">
      <template #extra>
        <a-button @click="onGetData" size="small">执行</a-button>
      </template>
      <a-spin :spinning="loading">
        <code v-if="getRes">{{ getRes }}</code>
        <custom-empty v-else />
      </a-spin>
    </a-card>
    <a-card hoverable title="提交数据">
      <template #extra>
        <a-dropdown>
          <a-button size="small">执行</a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a @click="onSubmit">progress</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="onSubmit({ useMessage: true })">message</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="onSubmitErr()">error</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
      <a-alert type="info" message="请注意顶部变化" showIcon />
    </a-card>
  </div>
</template>

<script lang="jsx" setup>
import { apiGet, apiPost, apiErr } from '@/api/test';
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
      $loading.hide({ method: 'error', tips: e.message || '请求失败' });
    });
};

const onSubmit = function (loadingParams = {}) {
  // 提交请求
  $loading.show(loadingParams);
  apiPost({ b: 222 })
    .then((res) => {
      if ($common.isSuccessCode(res)) {
        $loading.hide(loadingParams);
      } else {
        $loading.hide({ method: 'error', tips: _.get(res, 'data.message') });
      }
    })
    .catch((e) => {
      console.log(e);
      $loading.hide({ method: 'error', tips: e.message || '请求失败' });
    });
};

const onSubmitErr = function (loadingParams = {}) {
  // 提交请求
  $loading.show(loadingParams);
  apiErr({ b: 222 })
    .then((res) => {
      if ($common.isSuccessCode(res)) {
        $loading.hide(loadingParams);
      } else {
        $loading.hide({ method: 'error', tips: _.get(res, 'data.message') });
      }
    })
    .catch((e) => {
      console.log(e);
      $loading.hide({ method: 'error', tips: e.message || '请求失败' });
    });
};
</script>

<style scoped lang="less"></style>
