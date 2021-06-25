<template lang="pug">
div
  TabMenu(:items="storageList" route="storage")
  component(
    v-if="storage"
    :is="storageType"
    :ui="storage"
  )
</template>

<script>
import List from "./List";
import Form from "./Form";
import TabMenu from "../TabMenu/TabMenu.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { getConfigType, lookForRouter, getCurrentModule } from "./Services/Settings";

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

    lookForRouter("modules/fetchStorage");

    const storage = getCurrentModule();
    return {
      storageList: computed(() => store.state.modules.storageList),
      storage,
      storageType: getConfigType(storage),
    };
  },
};
</script>
