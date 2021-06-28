import { ref, computed } from "vue"
import openSocket from "socket.io-client"
import { useStore } from "vuex"
import _ from 'lodash'

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
  const dateFilter = computed(() => store.state.messages.dateFilter)
  socket.on('mqtt', message => {
    if (_.isEmpty(dateFilter.value?.before)) {
      store.commit("messages/addMessage", message)
    }
  })
}

export function startErrorSocket() {
  const store = useStore();
  socket.on('notification', message => store.commit("notifications/addNotification", message))
}

export const sendMqttMessage = (message) => socket.emit('mqtt', message)
