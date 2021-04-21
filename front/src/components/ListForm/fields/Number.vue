<template lang="pug">
Input(
  :field="field"
  :value="value"
  type="number"
)
</template>

<script>
import Input from "./Input";

export default {
  components: {
    Input,
  },
  props: {
    field: {
      required: true,
    },
    value: {
      default: null,
    },
  }
};
</script>
