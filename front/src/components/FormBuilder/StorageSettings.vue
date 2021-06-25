<template lang="pug">
div
  TabMenu(:items="storageList" route="storage")
  component(
    v-if="storage"
    :is="interface"
    :ui="storage"
  )
</template>

<script>
import List from "./List";
import Form from "./Form";
import TabMenu from "./TabMenu.vue";
import { mapState, useStore } from "vuex";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "StorageSettings",
  components: {
    List,
    Form,
    TabMenu,
  },
  setup() {
    const store = useStore();
    store.dispatch("modules/fetchStorageList");
    store.dispatch("modules/fetchStorage", "DatabaseStorage");

    const router = useRoute();

    watch(
      () => router.params,
      (params) => {
        store.dispatch("modules/fetchStorage", params.name);
      }
    );

    return {
      storageList: computed(() => store.state.modules.storageList),
      storage: computed(() => store.state.modules.module),
      fetchStorage: (storage) => store.dispatch("modules/fetchStorage", storage),
    };
  },
  computed: {
    ...mapState("modules", ["module"]),
    interface() {
      if (this.storage) {
        return this.storage.type;
      }
      return null;
    },
  },
};
</script>
