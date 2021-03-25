<template lang="pug">
div
  AddButton

  div(v-for="configRow in ui.value" )
    ConfigRow(
      :id="configRow.id"
    )
</template>

<script>
import Button from "./Button";
import ConfigRow from "./ConfigRow";
import AddButton from "./AddButton";

export default {
  name: "List",
  components: {
    Button,
    ConfigRow,
    AddButton,
  },
  props: ["ui"],
  methods: {
    add() {},
  },
};
</script>
