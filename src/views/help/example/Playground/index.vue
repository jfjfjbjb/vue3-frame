<template>
  <div class="example-content example-playground">
    <div class="examples">
      <a-card hoverable title="图片使用" id="example-playground-imgs">
        <img alt="Vue logo" class="logo" src="@/assets/M.png" />
        <img alt="Vue logo" class="logo" :src="importSrc" />
        <img alt="Vue logo" class="logo" :src="dynamicSrc" />
        <img alt="Vue logo" class="logo" src="@/assets/oceanbase.svg?url" />
        <OceanbaseIcon class="logo g-img" />
        <div class="bg-img"></div>
        <!-- suggest -->
        <ul class="g-suggest">
          <li>src="@/assets/M.png"</li>
          <li>import importSrc from '@/assets/M.png';</li>
          <li>const dynamicSrc = $common.getAssetsSrc('M.png');</li>
          <li>【svg图片使用】src="@/assets/oceanbase.svg?url"</li>
          <li>
            【svg组件使用】import OceanbaseIcon from
            '@/assets/oceanbase.svg?component';
          </li>
          <li>background-image: url('@/assets/oceanbase.svg');</li>
        </ul>
      </a-card>

      <a-card hoverable title="jsx使用" id="example-playground-jsx">
        <VNode :node="getJSX" />
        <VNode :node="cfg.getJSX" />
        <!-- suggest -->
        <ul class="g-suggest">
          <li>
            使用场景：
            <ul>
              <li>页面公用块</li>
              <li>slot嵌套过多</li>
              <li>递归封装</li>
            </ul>
          </li>
        </ul>
      </a-card>

      <a-card hoverable title="pinia初测" id="example-playground-pinia">
        <div class="color-purple">
          <a-tag>pinia: {{ testStoreCounter }}</a-tag>
          <a-tag>count: {{ state.count }}</a-tag>
        </div>
        <template #actions>
          <a-button class="color-green" size="small" @click="onTestPlus"
            >添加+</a-button
          >
        </template>
      </a-card>

      <a-card hoverable title="表单项初测" id="example-playground-form">
        <div>
          <a-date-picker
            v-model:value="date"
            valueFormat="YYYY-MM-DD"
            @change="logDate"
          />
          <a-date-picker v-model:value="year" picker="year" @change="logDate" />
          <div>{{ date }}</div>
        </div>
        <a-divider />
        <div>
          <custom-input
            style="width: 200px"
            v-model="inputValue"
            placeholder="默认placeholder"
            v-bind="inputAttrs"
          />
          <a-button @click="onCompTest">修改placeholder</a-button>
          <div>{{ inputValue }}</div>
        </div>
      </a-card>
    </div>
    <a-anchor
      class="anchor"
      :getCurrentAnchor="getCurrentAnchor"
      @click="onClickAnchor"
      @change="onChangeAnchor"
    >
      <a-anchor-link title="图片使用" href="#example-playground-imgs" />
      <a-anchor-link title="jsx使用" href="#example-playground-jsx" />
      <a-anchor-link title="pinia测试" href="#example-playground-pinia" />
      <a-anchor-link title="表单项初测" href="#example-playground-form" />
    </a-anchor>
  </div>
</template>

<script lang="jsx" setup>
import { reactive, ref, computed, onMounted } from 'vue';
import { useCounterStore } from '@/stores/counter';
import OceanbaseIcon from '@/assets/oceanbase.svg?component';
import config from './config.jsx';
import importSrc from '@/assets/M.png';
// const { proxy } = getCurrentInstance();
const uc = useCounterStore();
const self = {};
// refs
const dynamicSrc = $common.getAssetsSrc('M.png');
const state = reactive({ count: 0 });
const cfg = reactive(config(self));
const date = ref();
const year = ref();
const inputAttrs = ref({});
const inputValue = ref();
const activeAnchor = ref('#example-playground-imgs');
const getCurrentAnchor = ref(() => {
  return activeAnchor.value;
});
// computed
const testStoreCounter = computed(() => {
  return uc.counter;
});
// life circle
onMounted(() => {
  // console.log(proxy, uc.counter);
  // 监听事件
  window.$bus.on('event-test', (data) => {
    console.log('evt: ', data);
  });
});
// methods
function getJSX(h) {
  return <a-tag color='blue'>本文件jsx</a-tag>;
}
function onTestPlus() {
  uc.increment();
  state.count += 1;
  window.$bus.emit('event-test', state.count);
}
function onCompTest() {
  inputAttrs.value.placeholder = '修改后' + Math.random().toFixed(2);
}
function logDate(e) {
  window.$message.success(date.value);
  console.log('date:', date.value, year.value);
}
function onClickAnchor(e, link) {
  e.preventDefault();
  activeAnchor.value = link.href;
}
function onChangeAnchor(currentActiveLink) {
  if (currentActiveLink) {
    activeAnchor.value = currentActiveLink;
  }
}
self.state = state;
</script>

<style scoped lang="less">
.color-purple {
  .font-bold();
  font-size: @font-size-lg;
}
.logo {
  width: 50px;
  height: 50px;
}
.bg-img {
  width: 50px;
  height: 50px;
  display: inline-block;
  background-image: url('@/assets/oceanbase.svg');
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: middle;
}
</style>
