<template>
  <a-input
    v-bind="attrs"
    :value="modelValue"
    @input="onInput"
  ></a-input>
</template>

<script setup>
import { useAttrs, computed, watch } from 'vue';
const defaultAttrs = {
  placeholder: '请输入'
};

/** props */
const props = defineProps({
  modelValue: String
});
/** emit */
const emit = defineEmits(['update:modelValue']);

/** computed */
const attrs = computed(() => {
  return Object.assign({}, defaultAttrs, useAttrs());
});

/** methods */
const onInput = function($event) {
  emit('update:modelValue', $event.target.value);
}

/** watch */
watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      console.log('input newVal:', newVal);
    }
  },
  {
    // immediate: true
  }
);
</script>

<style scoped lang="less"></style>
