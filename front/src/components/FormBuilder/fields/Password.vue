<template lang="pug">
Layout(:field="field")
  img(src="@/assets/eye.png" @click="toogleVisible")
  input(v-model="value" :type="type" class="form-control")
</template>
<script>
import { computed, toRefs, ref } from "vue";
import { useStore } from "vuex";
import _ from "lodash";
import Layout from "./Layout";

export default {
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
    const { config, field } = toRefs(props);
    const type = ref("password");
    return {
      value: computed({
        get: () => config.value[field.value.name],
        set: (value) =>
          store.dispatch(
            "modules/updateConfig",
            _.set(config.value, field.value.name, value)
          ),
      }),
      type,
      toogleVisible: () =>
        (type.value = type.value === "password" ? "input" : "password"),
    };
  },
};
</script>
