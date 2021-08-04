<template lang="pug">
div.layer {{ name }}:&nbsp;
  span(v-if="isObject")
    span(@click="toggleOpen") ...
    span(v-if="isOpen")
      div(v-for="data, index in content")
        Field(
          :name="index"
          :content="data"
        )
  span(v-else) {{ content }}
</template>

<script>
import {toRefs, ref} from "vue";
import {computed} from "@vue/runtime-core";

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
}
</style>
