<template lang="pug">
div
.d-grid.gap-2
  .btn.btn-primary(@click="addConfig") Добавить
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["addConfig"]),
  },
};
</script>
