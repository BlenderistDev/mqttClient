<template lang="pug">
div.modal(@click="close")
  .message(@click='preventClose')
    button.btn-close(type="button" aria-label="Close" @click="close")
    .content
      .card
        .card-header
          div Topic: {{ message.topic }}
          div Retained: {{ message.retain }}
          div Date: {{ date }}
        .card-body Message:
            ObjectViewer(v-if="jsonData" :data="jsonData")
            span(v-else) &nbsp;{{ message.message }}
    .btn.btn-secondary(@click="close") Close
</template>

<script>
import { computed } from "vue";
import ObjectViewer from "../../ObjectViewer/ObjectViewer";
import { useStore } from "vuex";

export default {
  name: "MessageDetail",
  components: {
    ObjectViewer
  },
  setup() {
    const store = useStore()
    const message = computed(() => store.state.messages.currentMessage)
    const jsonData = computed(() => {
      try {
        const messageData = JSON.parse(message.value.message);
        if (typeof messageData === 'object') {
          return messageData
        }
      } catch (e) {
        return false;
      }
      return false;
    });
    return {
      message,
      date: computed(() => new Date(message.value.date).toLocaleString()),
      jsonData,
      close: () => store.commit('messages/setCurrentMessage', {}),
      preventClose: event => event.stopPropagation(),
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  background-color: rgba(0,0,0,.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal .message {
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 50%;
  height: 60%;
  padding: 5px;
  overflow-y: scroll;
  border: 3px solid black;
  border-radius: 5px;
}
@media screen and (max-width: 992px)  {
  .modal .message {
    width: 90%;
    height: 80%;
  }
}

.content {
  padding: 5%;
}
.btn {
  width: 100%;
  margin-top: auto;
}
</style>
