import { getConfig, reloadConfig } from './Config.js'
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import { fork } from 'child_process'

const config = getConfig('Mqtt')

const mqttPrefix = config.topic

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
    modules.push({
      name: sModuleDir,
      process: module
    })
  }).catch((err) => {
    console.log(`Module without logic: ${sModuleDir}`);
    if (err.code !== 'ENOENT') {
      throw err;
    }
  });
}

fs.promises.readdir('src/Modules').then(modules => _.map(modules, setModule))

export const getModules = () => modules

export const restartModule = (moduleName) => {
  _.find(modules, { 'name': moduleName })?.process?.kill()
  modules = _.filter(modules, module => module.name !== moduleName)
  reloadConfig()
  setModule(moduleName)
}
