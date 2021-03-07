<template lang="pug">
div
  div(v-for="module in moduleList") {{ module.name }}
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ModuleList',
  props: {
    msg: String
  },
  setup () {
    const store = useStore()
    store.dispatch('fetchModuleList')
    return {
      moduleList: computed(() => store.state.moduleList)
    }
  }
}
</script>