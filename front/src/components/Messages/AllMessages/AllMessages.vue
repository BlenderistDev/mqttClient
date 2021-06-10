<template lang="pug">
div
  template(v-for="(message, key) in filterMessages")
    .card(v-if="key < countToShow")
      .card-header {{ message.topic }}
      .card-body.justify-content-between
        Message(:message="message")
  .btn.btn-secondary.d-flex.justify-content-center(v-if="filterMessages.length > countToShow && page > 1" @click="page--") Less
  .btn.btn-secondary.d-flex.justify-content-center(v-if="filterMessages.length > countToShow" @click="page++") More
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import Message from "../Message";
import Controls from "../Controls";

export default {
  components: {
    Message,
    Controls
  },
  setup() {
    const store = useStore();
    const page = ref(1);
    const perPage = computed(() => store.state.messages.perPage);
    return {
      filterMessages: computed(() => store.getters["messages/filterMessages"]),
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
