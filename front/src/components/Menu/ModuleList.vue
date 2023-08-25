<template lang="pug">
ul.list-group-flush
  router-link.list-group-item(:to="{ name: 'Home' }")
    .menu-item Home
  router-link.list-group-item(:to="{ name: 'storage', params: { name: 'Storage' }}" @click="setModule({group:'Storage', name:'Storage'})")
    .menu-item Storage
  router-link.list-group-item(
    v-for="module in moduleList"
    :to="{ name: 'module', params: { name: module.name } }"
    @click="setModule(module)"
  )
    .menu-item {{ module.title ? module.title : module.name }}
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
      setModule: (module) => store.dispatch("modules/setModule", module),
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
  padding: 0.5rem 1rem 0.5rem 0px;
  background-color: inherit;
  border-bottom: 1px solid rgba(0,0,0,.125);
  border-top: 0;
}
.router-link-active {
  background-color: #dcd8e4;
}
</style>
