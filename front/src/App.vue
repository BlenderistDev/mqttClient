<template lang="pug">
.navbar.navbar-light.bg-light
router-view
</template>

<script>
import {startMqttSocket} from "./services/socket";

export default {
  setup() {
    startMqttSocket();
  }
}
</script>

<style scoped>
.navbar {
  height: 50px;
}
</style>
