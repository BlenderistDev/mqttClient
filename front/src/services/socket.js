import { ref } from "vue"
import openSocket from "socket.io-client"

const VUE_APP_SOCKET_URL = process.env.VUE_APP_SOCKET_URL

const socket = openSocket(VUE_APP_SOCKET_URL, { transports: ["websocket"] })

export function getSocket(topic) {
  const data = ref('')
  socket.on(topic, message => data.value = message)
  return data
}
