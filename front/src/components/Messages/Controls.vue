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
  .row
    .col-md-6 Before:
      input(type="datetime-local" v-model="before")
    .col-md-6 After:
      input(type="datetime-local" v-model="after")
</template>

<script>
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import Textarea from "./Textarea";
import _ from "lodash";

export default {
  name: "Controls",
  components: {
    Textarea,
  },
  setup() {
    const store = useStore();
    const messageFilter = computed({
      get: () => store.state.messages.messageFilter,
      set: (message) => store.commit("messages/setMessageFilter", message),
    });
    const topicFilter = computed({
      get: () => store.state.messages.topicFilter,
      set: (topic) => store.commit("messages/setTopicFilter", topic),
    });
    const perPage = computed({
      get: () => store.state.messages.perPage,
      set: (perPage) => store.commit("messages/setPerPage", perPage),
    });
    const bufferSize = computed({
      get: () => store.state.messages.bufferSize,
      set: (bufferSize) => store.commit("messages/setBufferSize", bufferSize),
    });
    const before = computed({
      get: () => store.state.messages.dateFilter.before,
      set: (before) =>
        store.dispatch(
          "messages/setDateFilter",
          _.set(store.state.messages.dateFilter, "before", before)
        ),
    });
    const after = computed({
      get: () => store.state.messages.after,
      set: (after) =>
        store.dispatch(
          "messages/setDateFilter",
          _.set(store.state.messages.dateFilter, "after", after)
        ),
    });
    return {
      messageFilter,
      topicFilter,
      perPage,
      bufferSize,
      before,
      after,
    };
  },
};
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
