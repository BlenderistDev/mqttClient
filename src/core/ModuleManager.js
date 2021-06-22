import { getConfig } from './Config.js'
import fs from 'fs'
import path from 'path'
import { fork } from 'child_process'
import EventEmitter from "events"
import { validateConfig } from './Validator.js'
import { sendNotification } from './Notification.js'
import * as R from 'ramda'

const moduleBaseDir = path.join('src', 'Modules')

const mqttConfig = getConfig('Mqtt')
const mqttPrefix = mqttConfig.topic

const moduleKiller = new EventEmitter()

const startModuleForkProcess = R.curry((moduleFolder, config) => {
  const modulePath = path.join(moduleFolder, 'Module.js')
  const moduleName = path.basename(moduleFolder)

  const module = fork(modulePath, [JSON.stringify({
    name: moduleName,
    config: config.config,
    mqttPrefix: mqttPrefix
  })]);
  moduleKiller.on(moduleName, () => module.kill())
})

const isConfigInvalid = R.pipe(R.prop('errors'), R.isEmpty)

const getModuleLauncher = moduleFolder => R.pipe(
  validateConfig(moduleFolder),
  R.andThen(
    R.ifElse(
      isConfigInvalid,
      startModuleForkProcess(moduleFolder),
      sendNotification(path.basename(moduleFolder))
  ))
)

const checkModuleExist = (modulePath) => fs.promises.access(modulePath, fs.constants.R_OK)

const startModule = (launcher) => R.ifElse(
  R.is(Array),
  R.map(launcher),
  launcher
)

const setup = R.curry((moduleDir, module) => {
  const moduleFolder =  path.join(moduleDir, module);
  const modulePath = path.join(moduleFolder, 'Module.js');
  const launchModule = getModuleLauncher(moduleFolder)

  R.pipe(
    checkModuleExist,
    R.otherwise(() => console.log(`Module without logic: ${module}`)),
    R.andThen(() => getConfig(module)),
    R.andThen(
      R.ifElse(
        R.isNil,
        () => sendNotification(module, `Skip module ${module}. Config is empty`),
        startModule(launchModule)
      )
    )
  )(modulePath)
})

const setupModule = setup(moduleBaseDir)

export const startModules = () => fs.promises.readdir(moduleBaseDir).then(R.map(setupModule))

export const restartModule = (moduleName) => {
  moduleKiller.emit(moduleName)
  setupModule(moduleName)
}
