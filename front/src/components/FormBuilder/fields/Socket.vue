<template lang="pug">
.socket-container.d-flex.justify-content-center
  .badge.bg-light {{ message }}
</template>

<script>
import { toRefs } from "vue";
import { getSocket } from "../../../services/socket";

export default {
  props: {
    field: {
      required: true,
    },
    config: {
      default: {},
    },
  },
  setup(props) {
    const { field } = toRefs(props);
    const message = getSocket(field.value.topic);
    return { message };
  },
};
</script>

<style scoped>
.socket-container {
  height: 100%;
  align-items: flex-end;
  font-size: xx-large;
}
.badge {
  color: chocolate;
}
</style>
