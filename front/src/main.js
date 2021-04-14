import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// import VueSocketIO from 'vue-3-socket.io'
// import SocketIO from 'socket.io-client'
//
// const options = { withCredentials: true }
//
// const socket = new VueSocketIO({
//   debug: true,
//   connection: SocketIO('http://localhost:4000', options),
//   vuex: {
//     store,
//     actionPrefix: "SOCKET_",
//     mutationPrefix: "SOCKET_"
//   }
// })

createApp(App)
  .use(router)
  .use(store)
  // .use(socket)
  .mount('#app')
