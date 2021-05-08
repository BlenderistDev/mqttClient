<template lang="pug">
div(:class='fieldClass')
  component(
    :is="field?.type"
    :field="field"
    :config="config"
  )
</template>

<script>
import Input from "./fields/Input";
import Number from "./fields/Number";
import Socket from "./fields/Socket";
import SocketList from "./fields/SocketList";
import { toRefs, computed } from "vue";
import _ from "lodash";

export default {
  props: ["field", "config"],
  components: {
    Input,
    Number,
    Socket,
    SocketList,
  },
  setup(props) {
    const { field } = toRefs(props);
    const fieldClass = computed(() => {
      if (!_.isUndefined(field.value.width)) {
        return `col-md-${field.value.width}`;
      } else {
        return "col-md";
      }
    });
    return {
      fieldClass,
    };
  },
};
</script>
