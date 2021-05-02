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
import axios from "axios";
import { mapActions, useStore } from "vuex";

export default {
  name: "List",
  components: {
    ConfigRow,
  },
  props: ["ui"],
  setup() {
    const store = useStore();
    const deleteConfig = (configId) => store.dispatch("deleteConfig", configId);
    return {
      deleteConfig,
    };
  },
  methods: {
    ...mapActions(["addConfig"]),
    restart() {
      const VUE_APP_API_URL = process.env.VUE_APP_API_URL;
      axios.get(VUE_APP_API_URL + `/api/restart/${this.$route.params.name}`);
    },
  },
};
</script>

<style>
.btn {
  width: 100%;
}
</style>
