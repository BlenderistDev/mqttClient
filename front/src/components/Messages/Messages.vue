<template lang="pug">
div(v-for="message in messages") {{ message.message }} {{ message.date }}
</template>

<script>
export default {
  props: ["messages"],
};
</script>
