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
import Form from "./Form";
import List from "./List";
import { mapState, useStore } from "vuex";

export default {
  name: "ModuleList",
  components: {
    Form,
    List,
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
        console.log(this.module);
        return this.module.type;
      }
      return null;
    },
  },
};
</script>
