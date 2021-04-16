<template lang="pug">|
div
  router-link(
    v-for="module in moduleList"
    :to="{ name: 'module', params: { name: module } }"
  )
    div {{ module }}
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "ModuleSettings",
  props: {
    msg: String,
  },
  setup() {
    const store = useStore();
    store.dispatch("fetchModuleList");
    return {
      moduleList: computed(() => store.state.moduleList),
    };
  },
};
</script>
