<template lang="pug">
div {{ field.name }}
  input(v-model="value" :type="type" class="form-control")
</template>

<script>
import { computed, toRefs } from "vue";
import { useStore } from "vuex";
import _ from "lodash";

export default {
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
          store.dispatch("updateConfig", _.set(config.value, field.value.name, value)),
      }),
    };
  },
};
</script>
