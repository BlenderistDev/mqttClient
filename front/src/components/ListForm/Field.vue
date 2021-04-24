<template lang="pug">
div
  component(
    :is="field?.type"
    :field="field"
    :value="value"
    @change="change($event)"
  )
</template>

<script>
import Input from "./fields/Input";
import Number from "./fields/Number";
import Socket from "./fields/Socket";

export default {
  props: ["field", "configRow"],
  components: {
    Input,
    Number,
    Socket,
  },
  computed: {
    value() {
      return this.configRow[this.field.name];
    },
  },
  methods: {
    change(event) {
      this.$emit("changeConfig", {
        name: this.field.name,
        value: event.target.value,
      });
    },
  },
};
</script>
