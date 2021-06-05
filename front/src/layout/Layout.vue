<template lang="pug">
.container-fluid
  Notification
  .row
    .col-2.menu
      Menu
    .col-md-10
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
.menu {
  border-right: 1px solid;
  margin-right: 0px;
  padding-right: 0px;
  background-color: #ced4da36;
}
</style>
