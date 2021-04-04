import axios from 'axios'
import _ from 'lodash'

export function fetchModuleList ({ commit }) {
  axios.get('/api/module/list').then(res => commit('setModuleList', res.data))
}

export function fetchModule ({commit}, module) {
  axios.get(`/api/module/${module}`).then((res) => commit('setModule', res.data))
}

export async function updateConfig({state, dispatch}, config) {
  const module = {...state.module}
  if (_.isNull(config.id)) {
    _.isArray(module.value) ? module.value.push(config) : module.value = [config]
  } else {
    module.value = _.map(module.value, value => value.id === config.id ? config : value)
  }
  await axios.post(`/api/module/${module.name}`, {
    config: module
  })
  dispatch('fetchModule', state.module.name)
}

export function addConfig({state, dispatch}) {
  const module = {...state.module}
  const config = _.reduce(module.fields, (config, field) => {
    config[field.name] = ''
    config.id = null
    return config
  }, {})
  dispatch('updateConfig', config)
}

export async function deleteConfig({state, dispatch}, id) {
  const module = {...state.module}
  module.value = _.filter(module.value, value => value.id !== id)
  await axios.post(`/api/module/${module.name}`, {
    config: module
  })
  dispatch('fetchModule', state.module.name)
}
