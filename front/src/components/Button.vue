<template lang="pug">
div(@click="press") {{ button.title }}
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  props: ["button"],
  name: "Button",
  setup() {
    const router = useRoute();
    return {
      moduleName: computed(() => router.params.name),
    };
  },
  methods: {
    press() {
      console.log(this.$router);
      axios
        .post("http://localhost:4000/api", {
          cmd: this.button.cmd,
          module: this.moduleName,
        })
        .then((res) => console.log(res));
    },
  },
};
</script>
