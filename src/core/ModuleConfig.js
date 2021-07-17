import fs from 'fs'
import path from 'path'
import { setConfig, getConfig } from './Config.js'
import { moduleDir } from "./Constants.js";
import * as R from 'ramda'
import md5 from 'md5'

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

const setHash = (config) => R.set(R.lensProp('hash'), md5(JSON.stringify(config)), config)

const addDefaultValidator = R.map(R.over(R.lensProp('validator'), R.defaultTo([])))

export const addDataToConfig = (moduleName, groupName) => R.pipe(
  R.over(R.lensProp('fields'), addDefaultValidator),
  R.set(R.lensProp('value'), getConfig(moduleName)),
  R.over(R.lensProp('value'), R.ifElse(
    R.is(Array),
    R.map(setHash),
    R.identity
  )),
  R.set(R.lensProp('group'), groupName),
  R.mergeDeepRight(defaultFields)
)

export const getConfigByPath = function(modulePath) {
  const pathData = modulePath.split(path.sep)
  const moduleName = pathData.pop()
  const groupName = pathData.pop()
  const configPath = path.join(process.cwd(), modulePath, 'config.js');

  return R.pipe(
    configPath => import(configPath),
    R.andThen(R.prop('default')),
    R.andThen(addDataToConfig(moduleName, groupName)),
    R.otherwise(err => console.log(err))
  )(configPath)
}

export const getModuleConfig = R.curry(function(group, moduleName) {
  const modulePath = path.join(moduleDir, group, moduleName);
  return getConfigByPath(modulePath)
})

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

const getDirList = (group) => R.pipe(
  fs.promises.readdir,
  R.andThen(R.map(getModuleConfig(group))),
  R.andThen(modules => Promise.all(modules)),
  R.andThen(R.filter(module => module.hide !== true))
)

export const getGroupList = group => getDirList(group)(path.join(moduleDir, group))
