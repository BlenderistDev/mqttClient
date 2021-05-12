<template lang="pug">
.container-xxl
  .row
    .col-2
      Menu
    .col-md-10
      ModuleSettings
</template>

<script>
import Menu from "@/components/Menu/Menu";
import ModuleSettings from "@/components/FormBuilder/ModuleSettings";

export default {
  name: "Module",
  components: {
    Menu,
    ModuleSettings,
  },
};
</script>
