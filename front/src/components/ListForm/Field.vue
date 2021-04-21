<template lang="pug">
div
  div {{ field }}
  //- Input(v-model="value" :type="field?.type" @change="change($event)" class="form-control")
  component(
    :is="field?.type"
    :field="field"
    :value="value"
  )
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";
import Input from "./fields/Input";
import Number from "./fields/Number";

export default {
  props: ["value", "name"],
  components: {
    Input,
    Number,
  },
  computed: {
    ...mapState(["module"]),
    field() {
      return _.find(this.module.fields, { name: this.name });
    },
  },
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
