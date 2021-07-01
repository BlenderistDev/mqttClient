import fs from 'fs'
import path from 'path'
import { setConfig, getConfig } from './Config.js'
import { moduleBaseDir, storageBaseDir } from "./Constants.js";
import _ from 'lodash'
import * as R from 'ramda'

const defaultFields = {
  fields: {
    id: {
      name: 'id',
      type: 'hidden',
      virtual: true,
      hidden: 'true'
    }
  }
}

export const getConfigByPath = function(modulePath) {
  const pathData = modulePath.split(path.sep)
  const moduleName = pathData.pop()
  const groupName = pathData.pop()
  const configPath = path.join(process.cwd(), modulePath, 'config.js');

  return fs.promises.access(configPath, fs.constants.R_OK)
    .then(() => import(configPath).then(module => _
      .chain(module.default)
      .omit('value')
      .set('value', getConfig(moduleName))
      .set('group', groupName)
      .merge(defaultFields)
      .value()
  )).catch((err) => {
    if (err.code !== 'ENOENT') {
      throw err
    }
  })
}

export const getModuleConfig = function(moduleName) {
  const modulePath = path.join(moduleBaseDir, moduleName);
  return getConfigByPath(modulePath)
}

export const getStorageConfig = function(moduleName) {
  const modulePath = path.join(storageBaseDir, moduleName);
  return getConfigByPath(modulePath)
}

const getExcludedFields = R.pipe(
  R.prop('fields'),
  R.filter(R.propEq('virtual', true)),
  R.keys()
)

const prepareConfigToSave = config => R.ifElse(
  R.propEq('type', 'Form'),
  R.prop('value'),
  R.pipe(
    R.prop('value'),
    R.map(R.omit(getExcludedFields(config))),
  )
)(config)

export const setModuleConfig = (config) => {
  setConfig(config.name, prepareConfigToSave(config))
}

const getDirList = (configGetter) => R.pipe(
  fs.promises.readdir,
  R.andThen(R.map(configGetter)),
  R.andThen(modules => Promise.all(modules)),
  R.andThen(R.filter(module => module.hide !== true))
)

export const getModuleList = () => getDirList(getModuleConfig)(moduleBaseDir)
export const getStorageList = () => getDirList(getStorageConfig)(storageBaseDir)
