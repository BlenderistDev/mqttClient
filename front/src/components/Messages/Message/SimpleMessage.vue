<template lang="pug">
span {{ message }}
</template>

<script>
export default {
  name: "SimpleMessage",
  props: {
    message: String
  }
}
</script>

<style scoped>

</style>
