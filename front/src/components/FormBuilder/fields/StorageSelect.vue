<template lang="pug">
Layout(:field="field")
  select.form-control(v-model="value")
    option(v-for="storage in storageList" :value="storage.hash") {{ storage }}
</template>

<script>
import { toRefs } from "vue";
import { getConfigValue } from "../../../services/configValue.js";
import Layout from "./Layout";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import * as R from "ramda";

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
    const storageList = computed(() => store.state.modules.storageList);
    return {
      value: getConfigValue(config, field),
      storageList: computed(() =>
        R.pipe(R.map(R.prop("value")), R.flatten)(storageList.value)
      ),
    };
  },
};
</script>
