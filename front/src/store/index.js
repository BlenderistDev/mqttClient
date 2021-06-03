import { createStore } from 'vuex'
import modules from './Modules/index'
import messages from './Messages/index'
import notifications from './Notifications/index'
export default createStore({
  modules: {
    modules: modules,
    messages: messages,
    notifications: notifications
  }
})
