<template lang="pug">
.container
  .row
    .col-3
      ModuleList
    .col-md-9
      ModuleSettings
</template>

<script>
import ModuleList from '@/components/ModuleList'
import ModuleSettings from '@/components/ModuleSettings'

export default {
  name: 'Home',
  components: {
    ModuleList,
    ModuleSettings
  }
}
</script>
