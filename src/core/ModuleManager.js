import { getConfig, reloadConfig } from './Config.js'
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import { fork } from 'child_process'
import EventEmitter from "events";

const moduleKiller = new EventEmitter()

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
      config: getConfig(sModuleDir)
    })]);
    moduleKiller.on(sModuleDir, () => module.kill())
  }).catch((err) => {
    if (err.code === 'ENOENT') {
      console.log(`Module without logic: ${sModuleDir}`)
    } else {
      throw err
    }
  })
}

export const startModules = () => fs.promises.readdir('src/Modules').then(modules => _.map(modules, setModule))

export const restartModule = (moduleName) => {
  moduleKiller.emit(moduleName)
  reloadConfig()
  setModule(moduleName)
}
