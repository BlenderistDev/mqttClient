<template lang="pug">
Layout(:field="field")
  input(v-model="value" :type="type" class="form-control")
</template>

<script>
import { toRefs } from "vue";
import Layout from "./Layout";
import { getConfigValue } from "@/services/configValue.js";

export default {
  components: {
    Layout,
  },
  props: {
    type: {
      default: "",
    },
    field: {
      required: true,
    },
    config: {
      default: {},
    },
  },
  setup(props) {
    const { config, field } = toRefs(props);
    return {
      value: getConfigValue(config, field),
    };
  },
};
</script>
