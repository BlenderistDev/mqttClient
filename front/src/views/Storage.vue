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
import { lookForRouter, getCurrentModule } from "../services/settings";
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
