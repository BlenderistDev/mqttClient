<template lang="pug">
div 
  div {{ message }}
  div zazaza
</template>

<script>
import { getSocket } from "../../../services/socket";

export default {
  props: {
    field: {
      required: true,
    },
    value: {
      default: null,
    },
  },
  setup(props) {
    const message = getSocket(props.field.topic);
    return { message };
  },
};
</script>
