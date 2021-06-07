<template lang="pug">
.container-fluid
  Notification
  .row
    .col-3.menu
      Menu
    .col-md-9.content
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
@media (min-width: 992px) {
  .row {
    height: 100%;
  }
}

.menu {
  padding: 0px;
}
.content {
  padding-right: 0px;
}
</style>
