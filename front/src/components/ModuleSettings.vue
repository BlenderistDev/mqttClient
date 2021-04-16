<template lang="pug">
div
  component(
    v-if="module"
    :is="interface"
    :ui="module"
  )
</template>

<script>
import { watch } from "vue";
import { useRoute } from "vue-router";
import List from "./ListForm/List";
import Socket from "./Messages/Socket.vue";
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
    watch(() => router.params, (params) => {
      store.dispatch("fetchModule", params.name);
    })
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
