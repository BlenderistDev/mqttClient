<template lang="pug">
.row
  .col-md-7
    template(v-if="isJson")
      ObjectViewer(:data="JSON.parse(message.message)")
    template(v-else) {{ message.message }}
  .col-md-2 Retain: {{ message.retain }}
  .col-md-1 Qos: {{ message.qos }}
  .col-md-2 {{ date }}
</template>

<script>
import {ref, toRefs, computed} from "vue";
import ObjectViewer from "../ObjectViewer/ObjectViewer";
import _ from 'lodash';

export default {
  name: "Message",
  components: {
    ObjectViewer,
  },
  props: {
    message: Object,
  },
  setup(props) {
    const { message } = toRefs(props);
    const jsonData = ref({});
    try {
      const messageData = computed(() => JSON.parse(message.value.message));
      if (typeof jsonData.value === 'object') {
        jsonData.value = messageData.value
      }

      // eslint-disable-next-line no-empty
    } catch (e) {}
    return {
      date: computed(() => new Date(message.value.date).toLocaleString()),
      jsonData,
      isJson: computed(() => !_.isEmpty(jsonData.value))
    };
  },
};
</script>
