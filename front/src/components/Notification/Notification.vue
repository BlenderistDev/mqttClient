<template lang="pug">
div
  .card(v-for="(notification, index) in notifications")
    .card-header.d-flex.justify-content-between
      span {{ notification.module }}
      button(@click="deleteNotification(index)") X
    .card-body
      ul.list-group
        li.list-group-item(v-for="error, field in notification.message.errors") {{ field }}:
          ul
            li(v-for="err in error") {{ err }}
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

<style scoped>
button {
  border: 0px;
}
</style>
