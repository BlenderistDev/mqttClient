<template lang="pug">
div
  template(v-for="(message, key) in messages")
    .card(v-if="key < countToShow")
      slot(:message="message")
      .card-body.justify-content-between
        Message(:message="message")
  .btn.btn-secondary.d-flex.justify-content-center(v-if="messages.length > countToShow && page > 1" @click="page--") Less
  .btn.btn-secondary.d-flex.justify-content-center(v-if="messages.length > countToShow" @click="page++") More
</template>

<script>
import { ref, computed } from "vue";
import Message from "./Message/Message";
import Controls from "./Controls";
import { useStore } from "vuex";

export default {
  name: "MessageList",
  components: {
    Message,
    Controls,
  },
  props: {
    messages: Array,
  },
  setup() {
    const store = useStore();
    const page = ref(1);
    const perPage = computed(() => store.state.messages.perPage);
    return {
      page,
      perPage,
      countToShow: computed(() => page.value * perPage.value),
    };
  },
};
</script>

<style scoped>
.btn {
  margin-top: 20px;
}
</style>
