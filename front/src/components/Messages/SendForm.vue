<template lang="pug">
.row
  .col-3
    div Topic:
    input(class="form-control" v-model="topic")
  .col-1
    div Retain:
    input(class="form-check-input" v-model="retain" type="checkbox")
  .col-6
    .input-group
      .input-group-prepend Message:
      textarea(class="form-control" v-model="message")
  span.col-2.btn.btn-success(@click="send") Send
</template>

<script>
import { ref } from "vue";
import { sendMqttMessage } from "../../services/socket";

export default {
  name: "SendForm",
  setup() {
    const topic = ref('');
    const message = ref('');
    const retain = ref(false);
    const send = () => sendMqttMessage(topic.value, message.value, retain.value)
    return {
      topic,
      message,
      send,
    }
  }
}
</script>

<style scoped>
.row {
  margin-bottom: 20px;
}
.input-group-prepend {
  padding-right: 10px;
}
.btn {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
