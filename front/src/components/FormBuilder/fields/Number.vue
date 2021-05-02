<template lang="pug">
Input(
  :field="field"
  :config="config"
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
    config: {
      default: {},
    },
  },
};
</script>
