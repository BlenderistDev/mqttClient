<template lang="pug">
.container
  .row
    .col-2
      Menu
    .col-md-10
      ModuleSettings
</template>

<script>
import Menu from "@/components/Menu/Menu";
import ModuleSettings from "@/components/ModuleSettings";

export default {
  name: "Home",
  components: {
    Menu,
    ModuleSettings,
  },
};
</script>
