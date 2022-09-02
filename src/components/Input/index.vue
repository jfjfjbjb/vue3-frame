<script setup>
import { useAttrs, computed } from 'vue';

defineProps({
  modelValue: String
});
defineEmits(['update:modelValue']);

const defaultAttrs = {
  placeholder: '请输入...'
};

const attrs = computed(() => {
  return Object.assign({}, defaultAttrs, useAttrs());
});

function getValue() {
  return 'test ref';
}

// 抛出去，ref可以使用 [git]
defineExpose({
  getValue
});
</script>

<template>
  <a-input
    v-bind="attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  ></a-input>
</template>

<style scoped lang="less"></style>
