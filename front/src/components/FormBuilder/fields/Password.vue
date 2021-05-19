<template lang="pug">
Layout(:field="field")
  img(src="@/assets/eye.png" @click="toogleVisible")
  input(v-model="value" :type="type" class="form-control")
</template>

<script>
import { toRefs, ref } from "vue";
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
    const type = ref("password");
    return {
      value: getConfigValue(config, field),
      type,
      toogleVisible: () =>
        (type.value = type.value === "password" ? "input" : "password"),
    };
  },
};
</script>
