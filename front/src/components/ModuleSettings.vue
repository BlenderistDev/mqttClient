<template lang="pug">
div {{ moduleName }}
</template>

<script>
import { computed } from 'vue'
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
  props: ['name'],
  async setup () {
    const router = useRoute()
    const ui = await axios.post('http://localhost:4000/api', {
        module: this.name,
        cmd: 'index'
      }).then(res => res.data)
    return {
      moduleName: computed(() => router.params.name),
      ui: computed(() => ui)
    }
  }
}
</script>
