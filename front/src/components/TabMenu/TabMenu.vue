<template lang="pug">
ul.nav.nav-fill
  li.nav-item
    router-link.nav-link.justify-content-center(
      :to="{ name: route, params: { name: 'Storage' } }"
      @click="setModule({name: 'Storage', group: 'Storage'})"
    ) Storage
  li.nav-item(v-for="item in items")
    router-link.nav-link.justify-content-center(
      :to="{ name: route, params: { name: item.name } }"
      @click="setModule({name: item.name, group: item.group})"
    ) {{ item.name }}
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "TabMenu",
  props: {
    items: Array,
    route: String,
  },
  setup() {
    const store = useStore();
    return {
      setModule: (module) => store.dispatch("modules/setModule", module),
    };
  },
};
</script>

<style scoped>
.nav-link {
  margin-left: 0px;
  border-bottom: 1px solid;
  border-color: grey;
  color: black;
  font-size: large;
}
.router-link-active {
  border-top: 2px solid;
  border-color: grey;
  border-bottom: 0px;
  border-left: 1px solid;
  border-right: 1px solid;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
