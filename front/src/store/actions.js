import axios from 'axios'

export function fetchModuleList ({ commit }) {
  axios.post('http://localhost:4000/api', {
    module: 'main',
    cmd: 'moduleList'
  }).then(res => commit('setModuleList', res.data))
}

export function fetchModule ({commit}, module) {
  axios.post("http://localhost:4000/api", {
    cmd: "index",
    module: module,
  }).then((res) => commit('setModule', res.data))
}