import fs from 'fs'
import path from 'path'
import { setConfig, getConfig } from '../core/Config.js'
import _ from 'lodash'

const defaultFields = {
  id: {
    name: 'id',
    type: 'hidden'
  }
}

export const getModuleConfig = function(moduleName) {
  const configPath = path.join(process.cwd(), 'src', 'Modules', moduleName, 'config.js');
  return fs.promises.access(configPath, fs.constants.R_OK)
    .then(() => import(configPath).then(module => _
      .chain(module.default)
      .omit('value')
      .set('value', getConfig(moduleName))
      .set('fields', defaultFields)
      .value()
  )).catch((err) => {
    if (err.code !== 'ENOENT') {
      throw err
    }
  })
}

export const setModuleConfig = (config) => setConfig(config.name, _.map(config.value, value => _.omit(value, ['id'])))
