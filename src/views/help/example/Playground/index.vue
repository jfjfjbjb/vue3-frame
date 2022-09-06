<template>
  <div class="example-content example-playground">
    <div class="examples">
      <a-card hoverable title="图片使用" id="example-playground-imgs">
        <img
          alt="Vue logo"
          class="logo"
          src="@/assets/M.png"
          width="125"
          height="125"
        />
        <img
          alt="Vue logo"
          class="logo"
          src="@/assets/oceanbase.svg?url"
          width="125"
          height="125"
        />
        <OceanbaseIcon class="img" width="125" height="125" />
        <div class="bg-img"></div>
        <!-- suggest -->
        <div class="suggest">
          <div>1、普通图片（png,jpg,...），小图片build为base64</div>
          <div>2、svg?url 【svg图片使用】</div>
          <div>3、svg?component 【svg组件使用】</div>
          <div>4、背景图使用</div>
        </div>
      </a-card>

      <a-card hoverable title="jsx使用" id="example-playground-jsx">
        <VNode :node="getJSX" />
        <VNode :node="cfg.getJSX" />
      </a-card>

      <a-card hoverable title="pinia测试" id="example-playground-pinia">
        <div class="color-purple">
          <div>testPinia: {{ testStoreCounter }}</div>
          <div>test: {{ state.count }}</div>
          <a-button class="color-green" @click="onTestPlus">添加+</a-button>
        </div>
      </a-card>

      <a-card hoverable title="表单项初测" id="example-playground-form">
        <div>
          {{ date }}
          <a-date-picker
            v-model:value="date"
            valueFormat="YYYY-MM-DD"
            @change="logDate"
          />
          <a-date-picker v-model:value="year" picker="year" @change="logDate" />
        </div>
        <a-divider />
        <div>
          <a-button @click="onCompTest">修改placeholder</a-button>
          <custom-input
            style="width: 200px"
            v-model="inputValue"
            placeholder="rrrrr"
            v-bind="inputAttrs"
          />
          <span>{{ inputValue }}</span>
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
// const { proxy } = getCurrentInstance();
const uc = useCounterStore();
const self = {};
// refs
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
  return (
    <div>
      1、本文件获取 <b style='color: blue;'>jsx</b>
    </div>
  );
}
function onTestPlus() {
  uc.increment();
  state.count += 1;
  window.$bus.emit('event-test', state.count);
}
function onCompTest() {
  inputAttrs.value.placeholder = '时刻提防' + Math.random();
}
function logDate(e) {
  window.$message.success(date.value);
  console.log(e, date.value, year.value, 'date log');
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
@color: purple;
.color-purple {
  color: @color;
  .font-bold();
  font-size: @font-size-lg;
}
.color-green {
  color: @color-green;
}
.bg-img {
  width: 125px;
  height: 125px;
  display: inline-block;
  background-image: url('@/assets/oceanbase.svg');
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: middle;
}
</style>
