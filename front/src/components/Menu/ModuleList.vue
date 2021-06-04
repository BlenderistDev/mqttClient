<template lang="pug">
ul.bg-light.list-group-flush
  li.list-group-item
    router-link(:to="{ name: 'Home' }")
      .menu-item Home
  li.list-group-item(v-for="module in moduleList")
    router-link(:to="{ name: 'module', params: { name: module } }")
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
      moduleList: computed(() => store.state.modules.moduleList)
    };
  },
};
</script>

<style scoped>
.menu-item {
  font-size: larger;
  color: black;
}
li {
  padding-left: 0px;
}
.router-link-active {
  color: red;
}
</style>
