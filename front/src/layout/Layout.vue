<template lang="pug">
.container-xxl
  Notification
  .row
    .col-2
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
