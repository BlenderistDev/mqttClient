<template lang="pug">
div
  .row
    .col-md-1 Topic:
    .col-9
      input(v-model='filterTopic')
    .col-md-1 On page:
    .col-md-1
      input(v-model='prePage')
  template(v-for="(message, key) in filtredMessages")
    .card(v-if="key < countToShow")
      .card-header {{ message.topic }}
      .card-body.justify-content-between
        Message(:message="message")
  .btn.btn-secondary.d-flex.justify-content-center(v-if="messages.length > countToShow" @click="page++") More
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
    const page = ref(1);
    const prePage = ref(100);
    return {
      messages,
      filterTopic,
      filtredMessages,
      page,
      prePage,
      countToShow: computed(() => page.value * prePage.value),
    };
  },
};
</script>

<style scoped>
input {
  width: 100%;
}
.btn {
  margin-top: 20px;
}
</style>
