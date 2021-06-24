import axios from 'axios'
const VUE_APP_API_URL = process.env.VUE_APP_API_URL

const MODULE_LINK = VUE_APP_API_URL + '/api/module'
const STORAGE_LINK = VUE_APP_API_URL + '/api/storage'

export const getModuleList = () => axios.get(MODULE_LINK + '/list')

export const getStorageList = () => axios.get(STORAGE_LINK + '/list'
)
export const getStorage = (storage) => axios.get(`${STORAGE_LINK}/${storage}`)

export const getModule = (module) => axios.get(`${MODULE_LINK}/${module}`)

export const updateModule = (module) => axios.post(`${MODULE_LINK}/${module.name}`, { config: module })

export const restartModule = (name, group) => {
  axios.post(VUE_APP_API_URL + `/api/restart`, {
    name: name,
    group: group,
  })
}
