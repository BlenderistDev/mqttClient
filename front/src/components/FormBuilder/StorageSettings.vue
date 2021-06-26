<template lang="pug">
div
  TabMenu(:items="storageList" route="storage")
  FormBuilder(
    v-if="storage"
    :config="storage"
  )
</template>

<script>
import TabMenu from "../TabMenu/TabMenu.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { lookForRouter, getCurrentModule } from "./Services/Settings";
import FormBuilder from "./FormBuilder.vue";

export default {
  name: "StorageSettings",
  components: {
    FormBuilder,
    TabMenu,
  },
  setup() {
    const store = useStore();
    store.dispatch("modules/fetchStorageList");
    store.dispatch("modules/fetchStorage", "DatabaseStorage");
    lookForRouter("modules/fetchStorage");
    return {
      storageList: computed(() => store.state.modules.storageList),
      storage: getCurrentModule(),
    };
  },
};
</script>
