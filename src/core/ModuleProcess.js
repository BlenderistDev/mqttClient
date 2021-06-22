import { fork } from 'child_process'
import EventEmitter from "events"
import path from 'path'
import * as R from 'ramda'
import { getConfig } from './Config.js'

const mqttConfig = getConfig('Mqtt')
const mqttPrefix = mqttConfig.topic

const moduleKiller = new EventEmitter()

export const startModuleProcess = R.curry((moduleFolder, config) => {
  const modulePath = path.join(moduleFolder, 'Module.js')
  const moduleName = path.basename(moduleFolder)

  const module = fork(modulePath, [JSON.stringify({
    name: moduleName,
    config: config.config,
    mqttPrefix: mqttPrefix
  })]);
  moduleKiller.on(moduleName, () => module.kill())
})

export const killModule = module => moduleKiller.emit(module)