<template lang="pug">
textarea(
  @input="updateHeight"
  :style="{ height: heightStyle }"
  v-model="value"
)
</template>

<script>
import {ref, nextTick, toRefs} from 'vue'
import {computed} from "@vue/runtime-core";

export default {
  name: "Textarea",
  props: ['modelValue'],
  setup(props, {emit}) {
    const heightStyle = ref(`auto`)
    const { modelValue } = toRefs(props)
    const value = computed({
      get: () => modelValue.value,
      set: value => emit('update:modelValue', value)
    })
    return {
      value,
      heightStyle,
      updateHeight: async (event) => {
        heightStyle.value = 'auto';
        await nextTick()
        heightStyle.value = `${event.target.scrollHeight}px`
      }
    }
  }
}
</script>

<style>
textarea {
  overflow-y:hidden;
}
</style>

