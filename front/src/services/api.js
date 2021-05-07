import axios from 'axios'

const VUE_APP_API_URL = process.env.VUE_APP_API_URL

const MODULE_LINK = VUE_APP_API_URL + '/api/module'

export const getModuleList = () => axios.get(MODULE_LINK + '/list')

export const getModule = (module) => axios.get(`${MODULE_LINK}/${module}`)

export const updateModule = (module) => axios.post(`${MODULE_LINK}/${module.name}`, { config: module })

export const restartModule = (moduleName) => axios.get(VUE_APP_API_URL + `/api/restart/${moduleName}`)