<template lang="pug">
.container-xxl
  .row
    .col-2
      Menu
    .col-md-10
      slot
</template>

<script>
import Menu from "@/components/Menu/Menu";

export default {
  name: "Module",
  components: {
    Menu,
  },
};
</script>
