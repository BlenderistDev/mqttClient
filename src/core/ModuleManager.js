import { getConfig } from './Config.js'
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import { fork } from 'child_process'
import EventEmitter from "events"
import { validateConfig } from './Validator.js'
import { sendNotification } from './Notification.js'

const moduleDir = path.join('src', 'Modules')

const mqttConfig = getConfig('Mqtt')
const mqttPrefix = mqttConfig.topic

const moduleKiller = new EventEmitter()

const launch = _.curry((moduleFolder, moduleName, config) => {
  const modulePath = path.join(moduleFolder, 'Module.js')
  validateConfig(moduleFolder, moduleName, config).then(data => {
    if (_.isEmpty(data)) {
      const module = fork(modulePath, [JSON.stringify({
        name: moduleName,
        config: config,
        mqttPrefix: mqttPrefix
      })]);
      moduleKiller.on(moduleName, () => module.kill())
    } else {
      sendNotification(moduleName, data)
    }
  })
})

/**
 * Проверяем существование модуля в директории модуля
 * Если модуль есть - инициализируем и кэшируем
 * @param {string} moduleDir
 * @param {string} module
 */
const setupModule = _.curry((moduleDir, module) => {
  const moduleFolder =  path.join(moduleDir, module);
  const modulePath = path.join(moduleFolder, 'Module.js');
  fs.promises.access(modulePath, fs.constants.R_OK).then(async () => {
    const config = getConfig(module)
    const launchModule = launch(moduleFolder, module)
    if (_.isEmpty(config)) {
      sendNotification(module, `Skip module ${module}. Config is empty`)
    } else if (_.isArray(config)) {
      _.map(config, launchModule)
    } else {
      launchModule(config)
    }
  }).catch((err) => {
    if (err.code === 'ENOENT') {
      console.log(`Module without logic: ${module}`)
    } else {
      throw err
    }
  })
})


export const startModules = () => fs.promises.readdir(moduleDir).then(modules => _.map(modules, setupModule(moduleDir)))

export const restartModule = (moduleName) => {
  moduleKiller.emit(moduleName)
  setupModule(moduleDir, moduleName)
}
