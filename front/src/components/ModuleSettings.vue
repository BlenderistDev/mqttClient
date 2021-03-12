<template lang="pug">
div
  component(
    v-if="ui"
    :is="interface"
    :ui="ui"
  ) 
</template>

<script>
import { computed, ref  } from 'vue'
import { useRoute } from 'vue-router'
import Form from './Form'
import List from './List'
import axios from 'axios'

export default {
  name: 'ModuleList',
  components: {
    Form,
    List
  },
  setup () {
    const router = useRoute()
    const ui = ref(null)
    axios.post('http://localhost:4000/api', {
        cmd: 'index',
        module: router.params.name
      }).then(res => ui.value = res.data)
    return {
      moduleName: computed(() => router.params.name),
      ui: ui
    }
  },
  computed: {
    interface () {
      return this.ui.type
    }
  }
}
</script>
