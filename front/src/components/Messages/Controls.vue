<template lang="pug">
div
  .row
    .col-md-1 Topic:
    .col-9
      input(v-model='topicFilter')
    .col-md-1 On page:
    .col-md-1
      input(v-model='perPage')
  .row
    .col-md-1 Message:
    .col-9
      Textarea(v-model='messageFilter')
    .col-md-1 Buffer:
    .col-md-1
      input(v-model='bufferSize')
</template>

<script>
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import Textarea from "./Textarea";

export default {
  name: "Controls",
  components: {
    Textarea
  },
  setup() {
    const store = useStore();
    const messageFilter = computed({
      get: () => store.state.messages.messageFilter,
      set: message => store.commit('messages/setMessageFilter', message)
    })
    const topicFilter = computed({
      get: () => store.state.messages.topicFilter,
      set: topic => store.commit('messages/setTopicFilter', topic)
    })
    const perPage = computed({
      get: () => store.state.messages.perPage,
      set: perPage => store.commit('messages/setPerPage', perPage)
    })
    const bufferSize = computed({
      get: () => store.state.messages.bufferSize,
      set: bufferSize => store.commit('messages/setBufferSize', bufferSize)
    })
    return {
      messageFilter,
      topicFilter,
      perPage,
      bufferSize
    }
  }
}
</script>

<style scoped>
input {
  width: 100%;
}
textarea {
  width: 100%;
  height: auto;
}
</style>
