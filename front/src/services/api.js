import axios from 'axios'

const VUE_APP_API_URL = process.env.VUE_APP_API_URL

export const getModuleList = () => axios.get(VUE_APP_API_URL + '/api/module/list')

export const getModule = (module) => axios.get(VUE_APP_API_URL + `/api/module/${module}`)

export const updateModule = (module) =>
  axios.post(VUE_APP_API_URL + `/api/module/${module.name}`, { config: module })

export const restartModule = (moduleName) => axios.get(VUE_APP_API_URL + `/api/restart/${moduleName}`)
