<template lang="pug">
div
  Field(
    v-for="field in fields"
    :field="field"
    :configRow="configRow"
    @changeConfig="change($event)"
  )
  .d-grid.gap-2
    .btn.btn-danger(@click="delete") delete
</template>

<script>
import Field from "./Field";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  props: {
    configRow: Object,
  },
  setup() {
    const store = useStore();
    const updateConfig = (config) => store.dispatch("updateConfig", config);
    const deleteConfig = (config) => store.dispatch("deleteConfig", config);

    return {
      updateConfig,
      deleteConfig,
      fields: computed(() => store.state.module.fields),
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
    delete() {
      this.deleteConfig(this.configRow.id);
    },
  },
};
</script>
