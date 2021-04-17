<template lang="pug">
.card(v-for="message in messages")
  .card-header {{ message.topic }}
  .card-body {{ message.message }}  {{ message.date }}
</template>

<script>
export default {
  props: ["messages"],
};
</script>
