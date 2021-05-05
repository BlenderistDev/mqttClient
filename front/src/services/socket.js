import { ref } from "vue"
import openSocket from "socket.io-client"

const VUE_APP_SOCKET_URL = process.env.VUE_APP_SOCKET_URL

export function getSocket(module) {
  const socket = openSocket(VUE_APP_SOCKET_URL, {
    transports: ["websocket"],
    query: {
      module: module
    }
  })
  const data = ref('')
  socket.on(module, message => data.value = message)
  return data
}
