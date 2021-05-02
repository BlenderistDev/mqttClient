<template lang="pug">
div
  .row
    .col-6
      .btn.btn-warning(@click="restart") Reload
  ConfigRow(
    :config="ui.value"
  )
</template>

<script>
import ConfigRow from "../FormBuilder/ConfigRow";
import axios from "axios";

export default {
  name: "List",
  components: {
    ConfigRow,
  },
  props: ["ui"],
  methods: {
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
