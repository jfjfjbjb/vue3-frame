<template>
  <a-input class="custom-input" v-bind="attrs" :value="value"></a-input>
</template>

<script setup>
import { useAttrs, computed, watch } from 'vue';
const defaultAttrs = {
  placeholder: '请输入'
};

defineOptions({
  inheritAttrs: false
});

/** props */
const props = defineProps({
  value: String
});
/** emit */
const emit = defineEmits(['update:value', 'input']);

/** computed */
const attrs = computed(() => {
  return Object.assign({}, defaultAttrs, useAttrs(), { onInput: onInput });
});

/** methods */
const onInput = function ($event) {
  emit('update:value', $event.target.value);
  emit('input', $event.target.value);
};

/** watch */
watch(
  () => props.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      console.log('input newVal:', newVal);
    }
  },
  {
    immediate: true
  }
);
</script>

<style scoped lang="less"></style>
