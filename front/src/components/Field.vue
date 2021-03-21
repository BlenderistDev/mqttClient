<template lang="pug">
div {{ name }}
  input(v-model="value" @change="change($event)")
</template>

<script>
export default {
  props: ["value", "name"],
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
