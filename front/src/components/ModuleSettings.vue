<template lang="pug">
div
  span(@click="restart") restart
  component(
    v-if="module"
    :is="interface"
    :ui="module"
  )
</template>

<script>
import { watch } from "vue";
import { useRoute } from "vue-router";
import List from "./ListForm/List";
import Messages from "./Messages/Messages";
import { mapState, useStore } from "vuex";
import axios from "axios";

export default {
  name: "ModuleList",
  components: {
    List,
    Messages,
  },
  setup() {
    const router = useRoute();
    const store = useStore();
    store.dispatch("fetchModule", router.params.name);
    watch(
      () => router.params,
      (params) => {
        store.dispatch("fetchModule", params.name);
      }
    );
  },
  computed: {
    ...mapState(["module"]),
    interface() {
      if (this.module) {
        return this.module.type;
      }
      return null;
    },
  },
  methods: {
    restart() {
      const VUE_APP_API_URL = process.env.VUE_APP_API_URL;
      axios.get(VUE_APP_API_URL + `/api/restart/${this.$route.params.name}`);
    },
  },
};
</script>
