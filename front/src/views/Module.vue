<template lang="pug">
Layout
  FormBuilder(
  v-if="module"
  :config="module"
)
</template>

<script>
import { getCurrentModule, MODULES_GROUP, initModuleForm } from "../services/modules";
import Layout from "../layout/Layout";
import FormBuilder from "../components/FormBuilder/FormBuilder.vue";

export default {
  name: "Module",
  components: {
    Layout,
    FormBuilder,
  },
  setup() {
    initModuleForm(MODULES_GROUP);
    return {
      module: getCurrentModule(),
    };
  },
};
</script>
