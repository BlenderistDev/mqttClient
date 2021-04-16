<template lang="pug">
.container
  .row
    .col-2
      ModuleList
    .col-md-10
      ModuleSettings
</template>

<script>
import ModuleList from "@/components/ModuleList";
import ModuleSettings from "@/components/ModuleSettings";

export default {
  name: "Home",
  components: {
    ModuleList,
    ModuleSettings,
  },
};
</script>
