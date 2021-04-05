import {mqttClient, mqttPrefix} from '../index.js';
import { getConfig } from '../Config/Config.js'
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const modules = [];

/**
 * Проверяем существование модуля в директории модуля
 * Если модуль есть - инициализируем и кэшируем
 * @param {string} sModuleDir
 */
function setModule(sModuleDir) {
  const sModuleFilePath = path.join(process.cwd(), 'src', 'Modules', sModuleDir, 'Module.js');
  fs.promises.access(sModuleFilePath, fs.constants.R_OK).then(async () => {
    const Module = await import(sModuleFilePath);
    const oModule = new Module.Module(`${mqttPrefix}/${sModuleDir}`, getConfig(sModuleDir))
    oModule.name = sModuleDir
    modules.push(oModule);
  }).catch((err) => {
    console.log(err);
    if (err.code !== 'ENOENT') {
      throw err;
    }
  });
}
fs.promises.readdir('src/Modules').then(modules => _.map(modules, setModule))

mqttClient.on('message', (topic, message) => {
  _.chain(modules)
  .filter(module => module.isTopicInSubscription(topic.toString()))
  .map(module => module.handleMessage(topic, message))
  .value()
});

export const getModules = () => modules

