<template lang="pug">
component(
  v-if="config"
  :is="type"
  :ui="config"
)
</template>

<script>
import List from "./List";
import Form from "./Form";
import { toRefs } from "@vue/reactivity";
import { getConfigType } from "../../services/modules";

export default {
  name: "FormBuilder",
  components: {
    List,
    Form,
  },
  props: {
    config: Object,
  },
  setup(props) {
    const { config } = toRefs(props);
    return {
      type: getConfigType(config),
    };
  },
};
</script>
