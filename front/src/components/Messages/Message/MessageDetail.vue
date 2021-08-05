<template lang="pug">
div
  ObjectViewer(v-if="isJson" :data="jsonData")
  div(v-else) {{ message }}
</template>

<script>
import {computed, ref} from "vue";
import _ from "lodash";
import ObjectViewer from "../../ObjectViewer/ObjectViewer";

export default {
  name: "MessageDetail",
  components: {
    ObjectViewer
  },
  props: {
    message: Object,
  },
  setup(props) {
    // не используем реактивность, так как необходимо показывать неизменяющееся сообщение
    // eslint-disable-next-line vue/no-setup-props-destructure
    const data = props.message

    const jsonData = ref({});

    try {
      const messageData = JSON.parse(data.message);
      if (typeof jsonData.value === 'object') {
        jsonData.value = messageData.value
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}
    return {
      data,
      jsonData,
      isJson: computed(() => !_.isEmpty(jsonData.value)),
    }
  }
}
</script>

<style scoped>

</style>
