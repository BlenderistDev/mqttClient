import {mqttClient, mqttPrefix} from './MqttClient.js'
import { getConfig } from './Config.js'
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import { fork } from 'child_process'

const modules = [];

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
    mqttClient.on('message', (topic, message) => {
      module.send({
        topic: topic,
        message: message
      })
    });
    modules.push(module)
  }).catch((err) => {
    console.log(err);
    if (err.code !== 'ENOENT') {
      throw err;
    }
  });
}
fs.promises.readdir('src/Modules').then(modules => _.map(modules, setModule))

export const getModules = () => modules

