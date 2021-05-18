<template lang="pug">
.row
  .col-md-7 {{ message.message }}
  .col-md-2 Retain: {{ message.retain }}
  .col-md-1 Qos: {{ message.qos }}
  .col-md-2 {{ date }}
</template>

<script>
import { toRefs } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
export default {
  name: "Message",
  props: {
    message: Object,
  },
  setup(props) {
    const { message } = toRefs(props);
    return {
      date: computed(() => new Date(message.value.date).toLocaleString()),
    };
  },
};
</script>
