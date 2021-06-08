<template lang="pug">
.desktop-menu
  div
    slot
</template>

<style scoped>
.desktop-menu {
  height: 100%;
  max-width: 250px;
  border-right: 1px solid;
  margin-right: 0px;
  padding-right: 0px;
  background-color: #ced4da36;
}
div {
  position: sticky;
  top: 0;
}
</style>
