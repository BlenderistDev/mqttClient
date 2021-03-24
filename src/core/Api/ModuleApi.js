import fs from 'fs'
import path from 'path'
import { setConfig, getConfig } from '../index.js'
import _ from 'lodash'

export const getModuleConfig = function(moduleName) {
  const configPath = path.join(process.env.MODULE_DIR, moduleName, 'config.js');
  return fs.promises.access(configPath, fs.constants.R_OK).then(() => {
    return import(configPath).then(module => _.merge(module.default, { value: getConfig(moduleName) }))
  }).catch((err) => {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  });
}

export const setModuleConfig = (config) => setConfig(config.name, _.map(config.value, value => _.omit(value, ['id'])))
