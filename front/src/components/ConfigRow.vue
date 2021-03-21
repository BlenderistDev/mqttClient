<template lang="pug">
div
  Field(
    v-for="(value, name) in configRow"
    :value="value"
    :name="name"
    @changeConfig="change($event)"
  )
</template>

<script>
import Field from "./Field";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    id: Number,
  },
  setup(props) {
    const store = useStore();
    const updateConfig = (config) => store.dispatch("updateConfig", config);
    return {
      configRow: computed(() => store.getters.getConfigRow(props.id)),
      updateConfig,
    };
  },
  components: {
    Field,
  },
  methods: {
    change(event) {
      const configRow = { ...this.configRow };
      configRow[event.name] = event.value;
      this.updateConfig(configRow);
    },
  },
};
</script>
