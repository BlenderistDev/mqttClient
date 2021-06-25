<template lang="pug">
.row
  router-link.col.justify-content-center(
    v-for="item in items"
    :to="{ name: route, params: { name: item } }"
  ) {{ item }}
</template>

<script>
export default {
  name: "TabMenu",
  props: {
    items: Array,
    route: String,
  },
};
</script>
