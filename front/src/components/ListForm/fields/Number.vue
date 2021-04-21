<template lang="pug">
div
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
  },
  computed: {
    showField() {
      return this.field?.type !== "hidden";
    },
  },
  methods: {
    change(event) {
      this.$emit("changeConfig", {
        name: this.name,
        value: event.target.value,
      });
    },
  },
};
</script>
