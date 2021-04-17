<template lang="pug">
div
  .row
    .col-md-1 Topic:
    .col-11
      input(v-model='filterTopic')
  .card(v-for="message in filtredMessages")
    .card-header {{ message.topic }}
    .card-body {{ message.message }}  {{ message.date }}
</template>

<script>
import { ref, computed } from "vue";
import _ from "lodash";

export default {
  props: ["messages"],
  setup(props) {
    const filterTopic = ref("");
    const filtredMessages = computed(() =>
      _.filter(
        props.messages,
        (message) => !filterTopic.value || message.topic.includes(filterTopic.value)
      )
    );
    return {
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
