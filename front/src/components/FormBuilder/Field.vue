<template lang="pug">
div(:class="fieldClass")
  component(
    :is="field.type"
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
import * as R from "ramda";

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
    const getClass = R.ifElse(
      R.has("width"),
      R.compose((width) => "col-md-" + width, R.prop("width")),
      () => "col-md"
    );
    return {
      fieldClass: computed(() => getClass(field.value)),
    };
  },
};
</script>
