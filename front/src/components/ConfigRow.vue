<template lang="pug">
div {{ field.name }} {{ field }}
  input(
    :type="field.type"
    :name="field.name"
    v-model="fieldValue"
  )
</template>

<script>
export default {
  props: {
    field: Object,
  },
  computed: {
    fieldValue: {
      get() {
        return this.field.value;
      },
      set(value) {
        console.log(value);
      },
    },
  },
};
</script>
