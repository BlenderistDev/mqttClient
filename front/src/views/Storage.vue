<template lang="pug">
Layout
  TabMenu(:items="storageList" route="storage")
  FormBuilder(
    v-if="storage"
    :config="storage"
  )
  StorageSettings(v-else)
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { lookForRouter, getCurrentModule } from "../services/modules";
import TabMenu from "../components/TabMenu/TabMenu.vue";
import Layout from "../layout/Layout";
import FormBuilder from "../components/FormBuilder/FormBuilder.vue";
import StorageSettings from "../components/StorageSettings/StorageSettings";

export default {
  name: "Storage",
  components: {
    Layout,
    TabMenu,
    FormBuilder,
    StorageSettings,
  },
  setup() {
    const store = useStore();
    store.dispatch("modules/fetchStorageList");
    lookForRouter("modules/fetchStorage");
    return {
      storageList: computed(() =>
        ["StorageSettings"].concat(store.state.modules.storageList)
      ),
      storage: getCurrentModule(),
    };
  },
};
</script>
