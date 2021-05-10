import { createStore } from 'vuex'

// import { state } from './state'
// import * as getters from './getters'
// import * as mutations from './mutations'
// import * as actions from './actions'

import modules from './Modules/index'

export default createStore({
  modules: {
    modules: modules,
  }
})
