<template lang="pug">
div
  button(@click="addConfig") Добавить
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["addConfig"]),
  },
};
</script>
