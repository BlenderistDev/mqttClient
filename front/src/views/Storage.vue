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
import { getCurrentModule } from "../services/modules";
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
    store.commit("modules/setGroup", "Storage");
    store.dispatch("modules/fetchStorageList");

    if (store.state.modules.module === null || store.state.modules.module.group !== store.state.modules.group) {
      store.dispatch("modules/fetchModule", 'Storage');
    }

    return {
      storageList: computed(() => store.state.modules.storageList),
      storage: getCurrentModule(),
    };
  },
};
</script>
