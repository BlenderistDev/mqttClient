<template lang="pug">
FormBuilder(
  v-if="module"
  :config="module"
)
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { lookForRouter, getCurrentModule } from "./Services/Settings";
import FormBuilder from "./FormBuilder.vue";

export default {
  name: "ModuleList",
  components: {
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
