<template lang="pug">
div
  button(@click="addConfig") Добавить
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    add() {},
    ...mapActions(["addConfig"]),
  },
};
</script>
