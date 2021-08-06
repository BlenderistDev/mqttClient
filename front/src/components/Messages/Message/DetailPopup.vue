<template lang="pug">
teleport(to="body")
  div(v-if="!isEmpty")
    MessageDetail
</template>

<script>
import { computed } from "vue";
import _ from "lodash";
import {useStore} from "vuex";
import MessageDetail from "./MessageDetail";

export default {
  name: "DetailPopup",
  components: {
    MessageDetail
  },
  setup() {
    const store = useStore()
    const message = computed(() => store.state.messages.currentMessage)
    return {
      isEmpty: computed(() => _.isEmpty(message.value)),
    }
  }
}
</script>
