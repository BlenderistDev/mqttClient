<template lang="pug">
Layout
  FormBuilder(
  v-if="module"
  :config="module"
)
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { lookForRouter, getCurrentModule } from "../services/modules";
import Layout from "../layout/Layout";
import FormBuilder from "../components/FormBuilder/FormBuilder.vue";

export default {
  name: "Module",
  components: {
    Layout,
    FormBuilder,
  },
  setup() {
    const router = useRoute();
    const store = useStore();
    store.dispatch("modules/fetchModule", router.params.name);
    lookForRouter("modules/fetchModule");
    return {
      module: getCurrentModule(),
    };
  },
};
</script>
