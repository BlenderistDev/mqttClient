<template lang="pug">
div
  .row
    .col(v-for="storage in storageList" @click="fetchStorage(storage)") {{ storage }}
  component(
    v-if="storage"
    :is="interface"
    :ui="storage"
  )
</template>

<script>
import List from "./List";
import Form from "./Form";
import {mapState, useStore} from "vuex";
import {computed} from "@vue/runtime-core";

export default {
  name: "StorageSettings",
  components: {
    List,
    Form,
  },
  setup() {
    const store = useStore();
    store.dispatch("modules/fetchStorageList");
    store.dispatch("modules/fetchStorage", 'DatabaseStorage');

    return {
      storageList: computed(() => store.state.modules.storageList),
      storage: computed(() => store.state.modules.module),
      fetchStorage: storage =>  store.dispatch("modules/fetchStorage", storage)
    }
  },
  computed: {
    ...mapState("modules", ["module"]),
    interface() {
      if (this.storage) {
        return this.storage.type;
      }
      return null;
    },
  },
};
</script>
