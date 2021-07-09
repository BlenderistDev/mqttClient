<template lang="pug">
ul.nav.nav-fill
  li.nav-item(:class="getClass('Storage')")
    router-link.nav-link.justify-content-center(
      :to="{ name: route, params: { name: 'Storage' } }"
      @click="setModule({name: 'Storage', group: 'Storage'})"
    ) Storage
  li.nav-item(v-for="item in items" :class="getClass(item.name)")
    router-link.nav-link.justify-content-center(
      :to="{ name: route, params: { name: item.name } }"
      @click="setModule({name: item.name, group: item.group})"
    ) {{ item.name }}
</template>

<script>
import { computed } from 'vue'
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: "TabMenu",
  props: {
    items: Array,
    route: String,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const activeModule = computed(() => route.params.name)
    return {
      setModule: (module) => store.dispatch("modules/setModule", module),
      getClass: name => name === activeModule.value ? 'active' : '',
    };
  },
};
</script>

<style scoped>
.nav {
  overflow: hidden;
  border-bottom: 1px solid;
}
.nav-link {
  margin-left: 0px;
  color: black;
  font-size: large;
  position: relative;
  transition: none;
}
.nav-item.active:after {
  width: 10px;
  height: 10px;
  position: absolute;
  content: '';
  display: block;
  right: -10px;
  bottom: 0;
  background: #f5f6f7;
}
.nav-item.active:before {
  width: 10px;
  height: 10px;
  position: absolute;
  content: '';
  display: block;
  left: -10px;
  bottom: 0;
  background: #f5f6f7;
}
.nav-item {
  position: relative;
}
.router-link-active {
  border-bottom: 0px;
  background: #f5f6f7;
  position: relative;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.router-link-active:after {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  display: block;
  content: '';
  bottom: 0;
  right: -20px;
  background: #fff;
  z-index: 9;
}
.router-link-active:before {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  display: block;
  content: '';
  bottom: 0;
  left: -20px;
  background: #fff;
}
</style>
