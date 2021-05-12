<template lang="pug">
div
  .row
    .col-md-1 Topic:
    .col-11
      input(v-model='filterTopic')
  .card(v-for="message in filtredMessages")
    .card-header {{ message.topic }}
    .card-body.row.justify-content-between
      .col-10 {{ message.message }}
      .col-2 {{ message.date }}
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import _ from "lodash";

export default {
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
