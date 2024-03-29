import _ from 'lodash'
import { getModuleList, getModule, updateModule } from '../../services/api.js'

export const fetchStorageList = ({ commit }) => getModuleList('Storage').then(res => commit('setStorageList', res.data))

export const fetchModuleList = ({ commit }) => getModuleList('Modules').then(res => commit('setModuleList', res.data))

export const fetchModule = ({commit, state}, module) => getModule(module, state.group).then((res) => commit('setModule', res.data))

export async function updateConfig({state, dispatch}, config) {
  const module = {...state.module}

  if (module.type === 'Form') {
    module.value = config
  } else if (module.type === 'List') {
    if (_.isNull(config.id)) {
      _.isArray(module.value) ? module.value.push(config) : module.value = [config]
    } else {
      module.value = _.map(module.value, value => value.id === config.id ? config : value)
    }
  }
  await updateModule(module)
  dispatch('fetchModule', module.name)
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
  await updateModule(module)
  dispatch('fetchModule', state.module.name)
}

export const setModule = ({state, dispatch}, module) => {
  state.group = module.group
  dispatch('fetchModule', module.name)
}
