<template lang="pug">
div(@click="showMessage") {{ message }}
teleport(to="body")
  div.modal(v-if="show")
    div
      ObjectViewer(:data="messageObject")
      button(@click="modalOpen = false") Закрыть
</template>

<script>
import ObjectViewer from "../../ObjectViewer/ObjectViewer";
import {ref, toRefs} from "vue";

export default {
  name: "ObjectMessage",
  components: {
    ObjectViewer,
  },
  props: {
    message: String
  },
  setup(props) {
    const {message} = toRefs(props)
    const show = ref(false)
    const messageObject = JSON.parse(message.value)
    const showMessage = () => {
      console.log('azaza')
      show.value = true
    };
    return {
      show,
      messageObject,
      showMessage
    }
  }
}
</script>

<style scoped>
.modal {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background-color: rgba(0,0,0,.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>
