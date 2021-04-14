<template lang="pug">
div
  component(
    v-if="module"
    :is="interface"
    :ui="module"
  )
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import List from "./List";
import Socket from "./Socket.vue";
import { mapState, useStore } from "vuex";

export default {
  name: "ModuleList",
  components: {
    List,
    Socket,
  },
  setup() {
    const router = useRoute();
    const store = useStore();
    store.dispatch("fetchModule", router.params.name);
    return {
      moduleName: computed(() => router.params.name),
    };
  },
  computed: {
    ...mapState(["module"]),
    interface() {
      if (this.module) {
        return this.module.type;
      }
      return null;
    },
  },
};
</script>
