<template lang="pug">
Layout(:field="field")
  select.form-control(v-model="value")
    option(v-for="storage in storageList" :value="storage.name") {{ storage.name }}
</template>

<script>
import { toRefs } from "vue";
import { getConfigValue } from "../../../services/configValue.js";
import Layout from "./Layout";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

export default {
  name: "StorageSelect",
  components: {
    Layout,
  },
  props: {
    field: {
      required: true,
    },
    config: {
      default: {},
    },
  },
  setup(props) {
    const store = useStore();
    store.dispatch("modules/fetchStorageList");
    const { config, field } = toRefs(props);
    return {
      value: getConfigValue(config, field),
      storageList: computed(() => store.state.modules.storageList),
    };
  },
};
</script>
