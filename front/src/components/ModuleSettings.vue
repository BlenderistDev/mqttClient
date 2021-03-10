<template lang="pug">
div {{ moduleName }}
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Form from 'Form'
import List from 'List'

export default {
  name: 'ModuleList',
  components: {
    Form,
    List
  },
  props: ['name'],
  setup () {
    const router = useRoute()
    return {
      moduleName: computed(() => router.params.name)
    }
  }
}
</script>
