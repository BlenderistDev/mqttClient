<template lang="pug">
div
  .row
    .col-6
      .btn.btn-success(@click="addConfig") Add
    .col-6
      .btn.btn-warning(@click="restart") Reload
  ConfigRow(
    v-for="config in ui.value"
    :config="config"
  )
    .col
     .btn.btn-danger(@click="deleteConfig(config.id)") delete
</template>

<script>
import ConfigRow from "../FormBuilder/ConfigRow";
import { restartModule } from "@/services/api.js";
import { mapActions } from "vuex";
import { useRoute } from "vue-router";
import {ref, toRefs} from "vue";
import { watch } from "vue";

export default {
  name: "List",
  components: {
    ConfigRow,
  },
  props: ["ui"],
  setup(props) {
    const route = useRoute();
    const moduleName = ref(route.params.name);
    const {ui} = toRefs(props)
    const restart = () => restartModule(ui.value.name, ui.value.group);
    watch(
      () => ui.name,
      async (newModuleName) => {
        moduleName.value = newModuleName;
      }
    );
    return {
      restart
    };
  },
  methods: {
    ...mapActions("modules", ["addConfig", "deleteConfig"]),
  },
};
</script>

<style>
.btn {
  width: 100%;
}
.col {
  display: flex;
  align-items: flex-end;
}
</style>
