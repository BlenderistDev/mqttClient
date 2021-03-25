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

export async function updateConfig({state, dispatch}, config) {
  const module = {...state.module}
  if (_.isUndefined(config.id)) {
    module.value.push(config)
  } else {
    module.value = _.map(module.value, value => value.id === config.id ? config : value)
  }
  await axios.post('http://localhost:4000/api', {
    cmd: "set",
    config: module
  })
  dispatch('fetchModule', state.module.name)
}

export function addConfig({state, commit}) {
  const module = {...state.module}
  // const config = _
  //   .chain(module.fields)
  //   .omit(['name'])
  //   .value()

  //   console.log(config)

  const config = _.reduce(module.fields, (config, field) => {
    config[field.name] = ''
    return config
  }, {})
  console.log(config)
  module.value.push(config)
  console.log(module)
  commit('setModule', module)
}