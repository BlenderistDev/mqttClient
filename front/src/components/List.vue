<template lang="pug">
div
  div(v-for="button in ui.buttons")
    Button(:button="button")

  div(v-for="configRow in ui.value" )
    ConfigRow(
      :id="configRow.id"
    )
</template>

<script>
import Button from "./Button";
import ConfigRow from "./ConfigRow";

export default {
  name: "List",
  components: {
    Button,
    ConfigRow,
  },
  props: ["ui"],
  methods: {
    add() {},
  },
};
</script>
