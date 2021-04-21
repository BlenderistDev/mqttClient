<template lang="pug">
div
  div {{ field.name }}
    input(v-model="value" :type="type" @change="change($event)" class="form-control")
</template>

<script>
// import _ from "lodash";
// import { mapState } from "vuex";

export default {
  props: {
    type: {
      default: "",
    },
    field: {
      required: true,
    },
    value: {
      default: null,
    },
  },
  // props: ["value", "name", "type"],
  // computed: {
  //   ...mapState(["module"]),
  //   field() {
  //     return _.find(this.module.fields, { name: this.name });
  //   },
  // },
  methods: {
    change(event) {
      this.$emit("changeConfig", {
        name: this.name,
        value: event.target.value,
      });
    },
  },
};
</script>
