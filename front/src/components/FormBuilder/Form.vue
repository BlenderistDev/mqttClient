<template lang="pug">
div
  .btn.btn-warning(@click="restart") Reload
  ConfigRow(
    :config="ui.value"
  )
</template>

<script>
import ConfigRow from "../FormBuilder/ConfigRow";
import { restartModule } from "@/services/api.js";
import {useRoute} from "vue-router";
import {ref} from "vue";

export default {
  name: "Form",
  components: {
    ConfigRow,
  },
  props: ["ui"],
  setup() {
    const route = useRoute();
    const moduleName = ref(route.params.name);
    return {
      restart: () => restartModule(moduleName.value),
    }
  }
};
</script>

<style>
.btn {
  width: 100%;
}
</style>
