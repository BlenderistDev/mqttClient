import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    moduleList: []
  },
  mutations: {
    setModuleList: (state, moduleList) => state.moduleList = moduleList 
  },
  actions: {
    fetchModuleList ({ commit }) {
      axios.post('http://localhost:4000/api', {
        module: 'main',
        cmd: 'moduleList'
      }).then(res => commit('setModuleList', res.data))
    }
  },
  modules: {
  }
})
