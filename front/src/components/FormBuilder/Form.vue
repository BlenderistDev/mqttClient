<template lang="pug">
div
  ConfigRow(
    :config="ui.value"
  )
</template>

<script>
import ConfigRow from "../FormBuilder/ConfigRow";

export default {
  name: "List",
  components: {
    ConfigRow,
  },
  props: ["ui"],
};
</script>

<style>
.btn {
  width: 100%;
}
</style>
