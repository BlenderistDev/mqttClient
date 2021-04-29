import {mqttClient, mqttPrefix} from './MqttClient.js'
import { getConfig, reloadConfig } from './Config.js'
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import { fork } from 'child_process'
import { socketEmitter } from '../Api/app.js'

let modules = [];

/**
 * Проверяем существование модуля в директории модуля
 * Если модуль есть - инициализируем и кэшируем
 * @param {string} sModuleDir
 */
function setModule(sModuleDir) {
  const modulePath = path.join('src', 'Modules', sModuleDir, 'Module.js');
  fs.promises.access(modulePath, fs.constants.R_OK).then(async () => {
    const module = fork(modulePath, [JSON.stringify({
      name: sModuleDir,
      topic: `${mqttPrefix}/${sModuleDir}`,
      config: getConfig(sModuleDir)
    })]);
    module.on('message', message => socketEmitter.emit('message', message))
    modules.push({
      name: sModuleDir,
      process: module
    })
  }).catch((err) => {
    console.log(err);
    if (err.code !== 'ENOENT') {
      throw err;
    }
  });
}

fs.promises.readdir('src/Modules').then(modules => _.map(modules, setModule))

mqttClient.on('message', (topic, message) => _.map(modules,
  module => module.process.send({
    topic: topic,
    message: message
  })
))

export const getModules = () => modules

export const restartModule = (moduleName) => {
  _.find(modules, { 'name': moduleName })?.process?.kill()
  modules = _.filter(modules, module => module.name !== moduleName)
  reloadConfig()
  setModule(moduleName)
}
