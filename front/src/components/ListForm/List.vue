<template lang="pug">
div
  AddButton
  ConfigRow(
    v-for="config in ui.value"
    :config="config"
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
