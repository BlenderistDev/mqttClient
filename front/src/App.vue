<template lang="pug">
.navbar.navbar-light.bg-light
router-view
</template>

<script>
import {startMqttSocket, startErrorSocket} from "./services/socket";

export default {
  setup() {
    startMqttSocket();
    startErrorSocket();
  }
}
</script>

<style scoped>
.navbar {
  height: 50px;
}
</style>
