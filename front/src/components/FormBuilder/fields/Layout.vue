<template lang="pug">
div
  div(v-if="!field.width")
    .input-group
      .input-group-prepend {{ field.name }}
      slot
  div(v-else) {{ field.name }}
    slot
</template>

<script>
export default {
  props: {
    field: {
      required: true,
    },
  },
};
</script>

<style scoped>
.input-group-prepend {
  margin-right: 10px;
}
</style>
