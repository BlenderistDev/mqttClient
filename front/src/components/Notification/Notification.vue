<template lang="pug">
div
  div(v-for="(notification, index) in notifications")
    span {{notification}}
    button(@click="deleteNotification(index)") X
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return {
      notifications: computed(() => store.state.notifications.notifications),
      deleteNotification: key => store.commit('notifications/deleteNotification', key)
    };
  },
};
</script>
