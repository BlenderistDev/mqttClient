<template lang="pug">
div
  template(v-if="showField")
    div {{ name }}
      input(v-model="value" :type="field?.type" @change="change($event)" class="form-control")
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'

export default {
  props: ["value", "name"],
  computed: {
    ...mapState(['module']),
    field () {
      return _.find(this.module.fields, {name: this.name})
    },
    showField () {
      return this.field?.type !== 'hidden'
    }
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
