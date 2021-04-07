import {mqttClient, mqttPrefix} from '../Mqtt/MqttClient.js'
import { getConfig } from '../Config/Config.js'
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
  const sModuleFilePath = path.join('src', 'Modules', sModuleDir, 'Module.js');
  fs.promises.access(sModuleFilePath, fs.constants.R_OK).then(async () => {
    const module = fork(sModuleFilePath, [JSON.stringify({
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

