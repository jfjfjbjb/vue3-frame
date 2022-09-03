<template>
  <a-input
    v-bind="attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
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
defineEmits(['update:modelValue']);

/** computed */
const attrs = computed(() => {
  return Object.assign({}, defaultAttrs, useAttrs());
});

/** watch */
watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      console.log(newVal, 'hahahah');
    }
  },
  {
    // immediate: true
  }
);
</script>

<style scoped lang="less"></style>
