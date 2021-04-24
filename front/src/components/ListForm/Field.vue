<template lang="pug">
div
  component(
    :is="field?.type"
    :field="field"
    :config="config"
  )
</template>

<script>
import Input from "./fields/Input";
import Number from "./fields/Number";
import Socket from "./fields/Socket";

export default {
  props: ["field", "config"],
  components: {
    Input,
    Number,
    Socket,
  },
};
</script>
