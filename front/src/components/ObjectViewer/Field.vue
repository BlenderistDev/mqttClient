<template lang="pug">
div.layer
  span(@click="toggleOpen" v-if="isObject")
    span(v-if="isOpen") -&nbsp;
    span(v-else) +&nbsp;
  span {{ name }}:&nbsp;
  span(v-if="isObject")
    span(v-if="isOpen")
      div(v-for="data, index in content")
        Field(
          :name="index"
          :content="data"
        )
  span(v-else) {{ content }}
</template>

<script>
import { toRefs, ref, computed } from "vue";

export default {
  name: 'Field',
  props: ['name', 'content'],
  setup(props) {
    const { content } = toRefs(props)
    const isObject = computed(() => typeof content.value === 'object')
    const isOpen = ref(false)
    return {
      isObject,
      isOpen,
      toggleOpen: () => isOpen.value = !isOpen.value
    }
  }
}
</script>

<style>
.layer {
  padding-left: 10px;
  border-left: 1px solid Gainsboro;
}
</style>
