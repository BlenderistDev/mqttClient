import fs from 'fs'
import path from 'path'
import { getManager } from '../index.js'
import _ from 'lodash'

export const getModuleConfig = function(moduleName) {
  const configPath = path.join(process.env.MODULE_DIR, moduleName, 'config.js');
  return fs.promises.access(configPath, fs.constants.R_OK).then(async () => {
    return import(configPath).then(module => {
      const config = module.default
      config.value = _.find(getManager().aModules, {name: moduleName}).config
      return config
    })
  }).catch((err) => {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  });
}

export const setModuleConfig = function(module, config) {

}
