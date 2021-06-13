<template lang="pug">
MessageList(:messages="filterMessages")
  template(v-slot:default="slotProps")
    .card-header {{ slotProps.message.topic }}
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import MessageList from "../MessageList";

export default {
  components: {
    MessageList,
  },
  setup() {
    const store = useStore();
    return {
      filterMessages: computed(() => store.getters["messages/filterMessages"]),
    };
  },
};
</script>
