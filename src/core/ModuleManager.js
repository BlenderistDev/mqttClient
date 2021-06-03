import { getConfig } from './Config.js'
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import { fork } from 'child_process'
import EventEmitter from "events"
import { validateConfig } from './Validator.js'
import { errorEmitter } from '../Api/socket.js'

const mqttConfig = getConfig('Mqtt')
const mqttPrefix = mqttConfig.topic

const moduleKiller = new EventEmitter()

const launch = _.curry((modulePath, sModuleDir, config) => {
  validateConfig(sModuleDir, config).then(data => {
    if (_.isEmpty(data)) {
      const module = fork(modulePath, [JSON.stringify({
        name: sModuleDir,
        config: config,
        mqttPrefix: mqttPrefix
      })]);
      moduleKiller.on(sModuleDir, () => module.kill())
    } else {
      console.error(sModuleDir)
      console.error(data)
      errorEmitter.emit('message', data)
    }
  })
})

/**
 * Проверяем существование модуля в директории модуля
 * Если модуль есть - инициализируем и кэшируем
 * @param {string} sModuleDir
 */
function setModule(sModuleDir) {
  const modulePath = path.join('src', 'Modules', sModuleDir, 'Module.js');
  fs.promises.access(modulePath, fs.constants.R_OK).then(async () => {
    const config = getConfig(sModuleDir)
    const launchModule = launch(modulePath, sModuleDir)
    if (_.isUndefined(config)) {
      console.log(`skip module ${sModuleDir}. Config is empty`)
    } else if (_.isArray(config)) {
      _.map(config, launchModule)
    } else {
      launchModule(config)
    }
  }).catch((err) => {
    if (err.code === 'ENOENT') {
      errorEmitter.emit('message', `Module without logic: ${sModuleDir}`)
      console.log(`Module without logic: ${sModuleDir}`)
    } else {
      throw err
    }
  })
}

export const startModules = () => fs.promises.readdir('src/Modules').then(modules => _.map(modules, setModule))

export const restartModule = (moduleName) => {
  moduleKiller.emit(moduleName)
  setModule(moduleName)
}
