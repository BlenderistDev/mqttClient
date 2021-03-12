<template lang="pug">
div
  div(@click="add") Add
  div(v-for="field in ui.fields" ) {{ field.name }}
    input(
      :type="field.type"
      :name="field.name"
  )
  div(@click="save")
</template>

<script>

export default {
  name: 'List',
  props: ['ui'],
  methods: {
    add () {

    }
  }
}
</script>