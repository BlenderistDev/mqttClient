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
import { getCurrentModule, STORAGE_GROUP } from "../services/modules";
import { useRoute } from "vue-router";
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
    const router = useRoute();
    const store = useStore();
    store.commit("modules/setGroup", STORAGE_GROUP);
    store.dispatch("modules/fetchStorageList");
    store.dispatch("modules/fetchModule", router.params.name);
    return {
      storageList: computed(() => store.state.modules.storageList),
      storage: getCurrentModule(),
    };
  },
};
</script>
