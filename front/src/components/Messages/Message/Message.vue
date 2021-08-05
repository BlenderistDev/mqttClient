<template lang="pug">
.row
  .col-md-7(@click="showMessage") {{ message.message }}
    teleport(to="body")
      div.modal(v-if="show")
        div
          MessageDetail(:message="message")
          button(@click="show = false") Закрыть
  .col-md-2 Retain: {{ message.retain }}
  .col-md-1 Qos: {{ message.qos }}
  .col-md-2 {{ date }}
</template>

<script>
import {ref, toRefs, computed} from "vue";
import ObjectViewer from "../../ObjectViewer/ObjectViewer";
import MessageDetail from "./MessageDetail";
import ObjectMessage from "./ObjectMessage";

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
    const { message } = toRefs(props);
    const show = ref(false)
    const showMessage = () => show.value = true
    return {
      date: computed(() => new Date(message.value.date).toLocaleString()),
      show,
      showMessage,
    };
  },
};
</script>


<style scoped>
.modal {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background-color: rgba(0,0,0,.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>
