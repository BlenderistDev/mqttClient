import axios from 'axios'
import _ from 'lodash'

const VUE_APP_API_URL = process.env.VUE_APP_API_URL

const MODULE_LINK = VUE_APP_API_URL + '/api/modules'
const STORAGE_LINK = VUE_APP_API_URL + '/api/storage'

export const getModuleList = group => axios.get(`${MODULE_LINK}/${group}/list`)

export const getStorage = (storage) => axios.get(`${STORAGE_LINK}/${storage}`)

export const getModule = (module, group) => axios.get(`${MODULE_LINK}/${group}/${module}`)

export const updateModule = (module) => axios.post(`${MODULE_LINK}/${module.name}`, { config: module })

export const restartModule = (name, group) => {
  axios.post(VUE_APP_API_URL + `/api/restart`, {
    name: name,
    group: group,
  })
}

export const getMessages = (filter, limit) => {
  return axios.post(VUE_APP_API_URL + '/api/messages', {
    filter: filter,
    limit: limit
  }).then(data => _.flatMap(data.data))
}
