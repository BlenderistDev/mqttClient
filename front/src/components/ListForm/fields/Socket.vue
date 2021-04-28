<template lang="pug">
.socket-container.d-flex.justify-content-center
  .badge.bg-light {{ rowMessage }}
</template>

<script>
import { toRefs, watch, ref } from "vue";
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
    const { config } = toRefs(props);
    const message = getSocket(props.field.topic);
    const rowMessage = ref("");
    watch(message, () => {
      if (message.value.id === config.value.id) {
        rowMessage.value = message.value.message;
      }
    });
    return { rowMessage };
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
