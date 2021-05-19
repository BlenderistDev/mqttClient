<template lang="pug">
Layout(:field="field")
  select.form-control(v-model="value")
    option(v-for="option in field.options" :value="option") {{ option }}
</template>

<script>
import { computed, toRefs } from "vue";
import { useStore } from "vuex";
import _ from "lodash";
import Layout from "./Layout";

export default {
  components: {
    Layout,
  },
  props: {
    type: {
      default: "",
    },
    field: {
      required: true,
    },
    config: {
      default: {},
    },
  },
  setup(props) {
    const store = useStore();
    const { config, field } = toRefs(props);
    return {
      value: computed({
        get: () => config.value[field.value.name],
        set: (value) =>
          store.dispatch(
            "modules/updateConfig",
            _.set(config.value, field.value.name, value)
          ),
      }),
    };
  },
};
</script>

<style scoped></style>
