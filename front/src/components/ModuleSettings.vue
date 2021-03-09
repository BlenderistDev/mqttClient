<template lang="pug">
div {{ moduleName }}
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'ModuleList',
  props: ['name'],
  setup () {
    const router = useRoute()
    return {
      moduleName: computed(() => router.params.name)
    }
  }
}
</script>
