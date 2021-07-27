<template lang="pug">
.container-fluid
  Notification
  .row
    .col-md-auto.menu
      DesktopMenu
    .col-md.content
      slot
</template>

<script>
import DesktopMenu from "@/components/Menu/DesktopMenu";
import Notification from "../components/Notification/Notification";

export default {
  name: "Module",
  components: {
    DesktopMenu,
    Notification,
  },
};
</script>

<style scoped>
.container-fluid {
  height: 100%;
}
@media (min-width: 992px) {
  .row {
    height: 100%;
  }
}
.menu {
  padding: 0px;
}
.content {
  max-width: 80%;
}
</style>
