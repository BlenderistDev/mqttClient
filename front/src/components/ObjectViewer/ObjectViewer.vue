<template lang="pug">
div
  Field(
    v-for="content, name in data"
    :name="name"
    :content="content"
  )
</template>

<script>
import Field from "./Field";

export default {
  name: 'JsonViewer',
  components: {
    Field
  },
  props: ['data'],
}
</script>
