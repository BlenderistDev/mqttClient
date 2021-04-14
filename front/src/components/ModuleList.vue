<template lang="pug">|
div
  Socket
  router-link(
    v-for="module in moduleList"
    :to="{ name: 'module', params: { name: module } }"
  ) 
    div {{ module }}
</template>

<script>
import Socket from "./Socket.vue";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "ModuleSettings",
  components: {
    Socket,
  },
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
