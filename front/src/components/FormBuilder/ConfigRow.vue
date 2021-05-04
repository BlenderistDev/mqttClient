<template lang="pug">
.row
  template(v-for="field in fields")
    Field(
      v-if="!field.hidden"
      :field="field"
      :config="config"
    )
  slot

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

<style scoped>
.row {
  margin-top: 10px;
}
</style>
