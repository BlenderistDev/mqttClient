<template lang="pug">
.row(@click="setCurrentMessage")
  .col-md-7 {{ message.message }}
  .col-md-2 Retain: {{ message.retain }}
  .col-md-1 Qos: {{ message.qos }}
  .col-md-2 {{ date }}
</template>

<script>
import { toRefs, computed } from "vue";
import {useStore} from "vuex";

export default {
  name: "Message",
  props: {
    message: Object,
  },
  setup(props) {
    const store = useStore();
    const { message } = toRefs(props);
    return {
      date: computed(() => new Date(message.value.date).toLocaleString()),
      setCurrentMessage: () => store.commit('messages/setCurrentMessage', message.value),
    };
  },
};
</script>



