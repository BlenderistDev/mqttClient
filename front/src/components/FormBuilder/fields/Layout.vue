<template lang="pug">
div
  div(v-if="!field.width")
    .input-group
      .input-group-prepend {{ field.name }}
      ToolTip(
        v-if="field.tooltip"
        :text="field.tooltip"
      )
      slot
  div(v-else) {{ field.name }}
    ToolTip(
      v-if="field.tooltip"
      :text="field.tooltip"
    )
    slot
</template>

<script>
import ToolTip from "../ToolTip";

export default {
  components: {
    ToolTip
  },
  props: {
    field: {
      required: true,
    },
  },
};
</script>

<style scoped>
.input-group-prepend {
  margin-right: 10px;
}
</style>
