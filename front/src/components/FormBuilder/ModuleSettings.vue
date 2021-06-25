<template lang="pug">
component(
  v-if="module"
  :is="configType"
  :ui="module"
)
</template>

<script>
import { useRoute } from "vue-router";
import List from "./List";
import Form from "./Form";
import { useStore } from "vuex";
import { getConfigType, lookForRouter, getCurrentModule } from "./Services/Settings";

export default {
  name: "ModuleList",
  components: {
    List,
    Form,
  },
  setup() {
    const router = useRoute();
    const store = useStore();
    store.dispatch("modules/fetchModule", router.params.name);
    lookForRouter("modules/fetchModule");

    const module = getCurrentModule();
    return {
      module,
      configType: getConfigType(module),
    };
  },
};
</script>
