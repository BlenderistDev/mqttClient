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
import List from "./FormBuilder/List";
import Messages from "./Messages/Messages";
import Form from "./FormBuilder/Form";
import { mapState, useStore } from "vuex";

export default {
  name: "ModuleList",
  components: {
    List,
    Messages,
    Form,
  },
  setup() {
    const router = useRoute();
    const store = useStore();
    store.dispatch("modules/fetchModule", router.params.name);
    watch(
      () => router.params,
      (params) => {
        store.dispatch("modules/fetchModule", params.name);
      }
    );
  },
  computed: {
    ...mapState("modules", ["module"]),
    interface() {
      if (this.module) {
        return this.module.type;
      }
      return null;
    },
  },
};
</script>
