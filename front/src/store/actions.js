import axios from 'axios'
import _ from 'lodash'

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

export function updateConfig({state}, config) {
  const module = {...state.module}
  module.value = _.map(module.value, value => value.id === config.id ? config : value)
  axios.post('http://localhost:4000/api', {
    cmd: "set",
    config: module
  })
}