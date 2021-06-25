<template lang="pug">
.row
  router-link.col.justify-content-center(
    v-for="item in items"
    :to="{ name: 'storage', params: { name: item } }"
  ) {{ item }}
</template>

<script>
export default {
  name: "StorageMenu",
  props: {
    items: Array,
  },
};
</script>
