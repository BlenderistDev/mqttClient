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
import { ref } from "vue";
import { watch } from "vue";

export default {
  name: "List",
  components: {
    ConfigRow,
  },
  props: ["ui"],
  setup() {
    const route = useRoute();
    const moduleName = ref(route.params.name);
    watch(
      () => route.params.name,
      async (newModuleName) => {
        moduleName.value = newModuleName;
      }
    );
    return {
      restart: () => restartModule(moduleName.value),
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
