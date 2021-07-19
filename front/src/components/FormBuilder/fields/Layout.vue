<template lang="pug">
div
  div(v-if="!field.width")
    .input-group
      .input-group-prepend {{ name }}
        Tooltip(
          v-if="field.tooltip"
          :text="field.tooltip"
        )
      slot
  div(v-else) {{ name }}
    Tooltip(
      v-if="field.tooltip"
      :text="field.tooltip"
    )
    slot
</template>

<script>
import { toRefs } from "@vue/reactivity";
import Tooltip from "../../Tooltip/Tooltip.vue";
import { computed } from "@vue/runtime-core";

export default {
  components: {
    Tooltip,
  },
  props: {
    field: {
      required: true,
    },
  },
  setup(props) {
    const { field } = toRefs(props);
    const isRequired = computed(() => field.value.validator.includes("required"));
    const name = computed(() => field.value.name + (isRequired.value ? "*" : ""));
    return {
      name,
    };
  },
};
</script>

<style scoped>
.input-group-prepend {
  margin-right: 10px;
}
</style>
