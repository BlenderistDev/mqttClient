<template lang="pug">
.row
  Field(
    v-for="field in fields"
    :field="field"
    :config="config"
  )
  .d-grid.gap-2
    .btn.btn-danger(@click="deleteConfig") delete
</template>

<script>
import Field from "./Field";
import { useStore } from "vuex";
import { computed, toRefs } from "vue";

export default {
  props: {
    config: Object,
  },
  components: {
    Field,
  },
  setup(props) {
    const store = useStore();
    const { config } = toRefs(props);
    const deleteConfig = () => store.dispatch("deleteConfig", config.value.id);
    return {
      deleteConfig,
      fields: computed(() => store.state.module.fields),
    };
  },
};
</script>
