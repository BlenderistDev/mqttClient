<template lang="pug">
div
  .row
    .col-md-1 Topic:
    .col-11
      input(v-model='filterTopic')
  .card(v-for="message in filtredMessages")
    .card-header {{ message.topic }}
    .card-body.justify-content-between
      Message(:message="message")
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import Message from "../Message";
import _ from "lodash";

export default {
  components: {
    Message,
  },
  setup() {
    const store = useStore();
    const messages = computed(() => store.state.messages.messages);
    const filterTopic = ref("");
    const filtredMessages = computed(() =>
      _.filter(
        messages.value,
        (message) => !filterTopic.value || message.topic.includes(filterTopic.value)
      )
    );
    return {
      messages,
      filterTopic,
      filtredMessages,
    };
  },
};
</script>

<style scoped>
input {
  width: 100%;
}
</style>
