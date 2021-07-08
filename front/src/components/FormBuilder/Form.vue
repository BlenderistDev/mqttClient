<template lang="pug">
div
  .btn.btn-warning(v-if="!ui.hideReload" @click="restart") Reload
  ConfigRow(
    :config="ui.value"
  )
</template>

<script>
import ConfigRow from "../FormBuilder/ConfigRow";
import { restartModule } from "../../services/api";
import { toRefs } from "vue";

export default {
  name: "Form",
  components: {
    ConfigRow,
  },
  props: ["ui"],
  setup(props) {
    const { ui } = toRefs(props);
    return {
      restart: () => restartModule(ui.value.name, ui.value.group),
    };
  },
};
</script>

<style>
.btn {
  width: 100%;
}
</style>
