<template lang="pug">
.container-fluid
  Notification
  .row
    .col-3.menu
      Menu
    .col-md-9
      slot
</template>

<script>
import Menu from "@/components/Menu/Menu";
import Notification from "../components/Notification/Notification";

export default {
  name: "Module",
  components: {
    Menu,
    Notification,
  },
};
</script>

<style scoped>
.container-fluid {
  height: 100%;
}
.row {
  height: 100%;
}
</style>
