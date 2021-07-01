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

export const setModuleConfig = (config) =>
  setConfig(config.name,
    config.type === 'Form' ? config.value :
      _.map(config.value, value =>
        _.omit(value,
          _.chain(config.fields)
            .filter(field => field.virtual === true)
            .map('name')
            .value()
        )
      )
  )

const getDirList = dir => fs.promises.readdir(dir)

export const getModuleList = () => getDirList(moduleBaseDir)
  .then(R.map(getModuleConfig))
  .then(modules => Promise.all(modules))
  .then(R.filter(module => module.hide != true))

export const getStorageList = () => getDirList(storageBaseDir)
  .then(R.map(getStorageConfig))
  .then(storages => Promise.all(storages))
  .then(R.filter(module => module.hide != true))
