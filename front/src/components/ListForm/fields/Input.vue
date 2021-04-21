<template lang="pug">
div {{ field.name }}
  input(v-model="value" :type="type" class="form-control")
</template>

<script>
export default {
  props: {
    type: {
      default: "",
    },
    field: {
      required: true,
    },
    value: {
      default: null,
    },
  }
};
</script>
