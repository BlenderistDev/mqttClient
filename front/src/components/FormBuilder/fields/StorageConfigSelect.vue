<template lang="pug">
Layout(:field="field" v-if="configList")
  select.form-control(v-model="value")
    option(v-for="config in configList" :value="config.hash") {{ getOptionText(config) }}
</template>

<script>
import { toRefs } from "vue";
import { getConfigValue } from "../../../services/configValue.js";
import Layout from "./Layout";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import * as R from 'ramda'

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
    const currentStorage = computed(() => R.pipe(
      R.find(R.propEq('name', config.value.storage)),
      R.defaultTo([])
    )(storageList.value))
    const fieldsToShowInOption = computed(() => R.keys(
      R.reject(
          R.either(
              R.propEq('hidden', 'true'),
              R.propEq('type', 'Password')
          )
      )(currentStorage.value.fields)
    ))
    return {
      value: getConfigValue(config, field),
      configList:  computed(() => currentStorage.value.value),
      getOptionText: config => R.pipe(
          R.pick(fieldsToShowInOption.value),
          R.values(),
          R.join('->')
      )(config),
    };
  },
};
</script>
