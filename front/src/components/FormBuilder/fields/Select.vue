<template lang="pug">
Layout(:field="field")
  select.form-control(v-model="value")
    option(v-for="option in field.options" :value="option") {{ option }}
</template>

<script>
import { toRefs } from "vue";
import { getConfigValue } from "@/services/configValue.js";
import Layout from "./Layout";

export default {
  components: {
    Layout,
  },
  props: {
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
