<template lang="pug">
div
  AddButton
  div(v-for="configRow in ui.value")
    ConfigRow(
      :configRow="configRow"
    )
</template>

<script>
import ConfigRow from "./ConfigRow";
import AddButton from "./AddButton";

export default {
  name: "List",
  components: {
    ConfigRow,
    AddButton,
  },
  props: ["ui"],
};
</script>
