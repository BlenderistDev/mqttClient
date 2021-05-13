<template lang="pug">
.row
  .col-md-3
    div Topic:
    input(class="form-control" v-model="topic")
  .col-sm-6
      div Message:
      textarea(class="form-control" v-model="message")
  .col-sm-1
    div Retain:
    input.form-check-input(v-model="retain" type="checkbox")
  .col-sm-2
    span.btn.btn-success(@click="send") Send
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
  margin-top: 10px;
  margin-bottom: 20px;
}
.btn {
  justify-content: center;
}
.col-sm-2 {
  display: flex;
  align-items: flex-end;
  height: 60px;
}

.form-check-input {
  margin-top: 0px;
  width: 40px;
  height: 40px;
}
textarea {
  height: 40px;
}
</style>
