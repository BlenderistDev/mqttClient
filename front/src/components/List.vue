<template lang="pug">
div
  div(v-for="button in ui.buttons")
    Button(:button="button")

  div(v-for="field in ui.fields" ) {{ field.name }}
    input(
      :type="field.type"
      :name="field.name"
  )
</template>

<script>
import Button from "./Button";

export default {
  name: "List",
  components: {
    Button,
  },
  props: ["ui"],
  methods: {
    add() {},
  },
};
</script>
