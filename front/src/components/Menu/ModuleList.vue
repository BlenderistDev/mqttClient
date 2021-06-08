<template lang="pug">
ul.list-group-flush
  router-link.list-group-item(:to="{ name: 'Home' }")
    .menu-item Home
  router-link.list-group-item(
    v-for="module in moduleList"
    :to="{ name: 'module', params: { name: module } }"
  )
    .menu-item {{ module }}
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "ModuleSettings",
  props: {
    msg: String,
  },
  setup() {
    const store = useStore();
    store.dispatch("modules/fetchModuleList");
    return {
      moduleList: computed(() => store.state.modules.moduleList),
    };
  },
};
</script>

<style scoped>
.menu-item {
  font-size: larger;
  color: black;
  margin-left: 20px;
}
.list-group-flush {
  padding-left: 0px;
}
.list-group-item {
  padding-left: 0px;
  background-color: inherit;
}
.router-link-active {
  background-color: #dcd8e4;
}
</style>
