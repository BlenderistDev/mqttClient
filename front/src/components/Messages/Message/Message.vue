<template lang="pug">
.row
  .col-md-7(@click="setCurrentMessage") {{ message.message }}
  .col-md-2 Retain: {{ message.retain }}
  .col-md-1 Qos: {{ message.qos }}
  .col-md-2 {{ date }}
</template>

<script>
import {ref, toRefs, computed} from "vue";
import ObjectViewer from "../../ObjectViewer/ObjectViewer";
import MessageDetail from "./MessageDetail";
import ObjectMessage from "./ObjectMessage";
import {useStore} from "vuex";

export default {
  name: "Message",
  components: {
    MessageDetail,
    ObjectViewer,
    ObjectMessage
  },
  props: {
    message: Object,
  },
  setup(props) {
    const store = useStore();
    const { message } = toRefs(props);
    const show = ref(false)
    return {
      date: computed(() => new Date(message.value.date).toLocaleString()),
      show,
      setCurrentMessage: () => store.commit('messages/setCurrentMessage', message.value),
    };
  },
};
</script>



