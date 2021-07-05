<template lang="pug">
Layout
  TabMenu(:items="storageList" route="storage")
  FormBuilder(
    v-if="storage"
    :config="storage"
  )
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { getCurrentModule, STORAGE_GROUP, initModuleForm } from "../services/modules";
import TabMenu from "../components/TabMenu/TabMenu.vue";
import Layout from "../layout/Layout";
import FormBuilder from "../components/FormBuilder/FormBuilder.vue";

export default {
  name: "Storage",
  components: {
    Layout,
    TabMenu,
    FormBuilder,
  },
  setup() {
    initModuleForm(STORAGE_GROUP);
    const store = useStore();
    store.dispatch("modules/fetchStorageList");
    return {
      storageList: computed(() => store.state.modules.storageList),
      storage: getCurrentModule(),
    };
  },
};
</script>
