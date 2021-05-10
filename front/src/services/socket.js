import { ref } from "vue"
import openSocket from "socket.io-client"
import { useStore } from "vuex"

const VUE_APP_SOCKET_URL = process.env.VUE_APP_SOCKET_URL

const socket = openSocket(VUE_APP_SOCKET_URL, {
  transports: ["websocket"],
  query: {
    frontend: true
  }
})

export function getSocket(module) {
  const data = ref('')
  socket.on('data', message => {
    if (message.module === module) {
      data.value = message.data
    }
  })
  return data
}

export function startMqttSocket() {
  const store = useStore();
  socket.on('mqtt', message => store.commit("messages/addMessage", message))
}
