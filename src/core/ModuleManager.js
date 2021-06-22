import { getConfig } from './Config.js'
import fs from 'fs'
import path from 'path'
import { validateConfig } from './Validator.js'
import { sendNotification } from './Notification.js'
import { startModuleProcess, killModule } from './ModuleProcess.js'
import * as R from 'ramda'

const moduleBaseDir = path.join('src', 'Modules')

const isConfigInvalid = R.pipe(R.prop('errors'), R.isEmpty)

const getModuleLauncher = moduleFolder => R.pipe(
  validateConfig(moduleFolder),
  R.andThen(
    R.ifElse(
      isConfigInvalid,
      startModuleProcess(moduleFolder),
      sendNotification(path.basename(moduleFolder))
  ))
)

const checkModuleExist = (modulePath) => fs.promises.access(modulePath, fs.constants.R_OK)

const startModule = (launcher) => R.ifElse(
  R.is(Array),
  R.map(launcher),
  launcher
)

const launch = (module, launcher) => R.pipe(
  checkModuleExist,
  R.otherwise(() => console.log(`Module without logic: ${module}`)),
  R.andThen(() => getConfig(module)),
  R.andThen(
    R.ifElse(
      R.isNil,
      () => sendNotification(module, `Skip module ${module}. Config is empty`),
      startModule(launcher)
    )
  )
)

const setup = R.curry((moduleDir, module) => {
  const moduleFolder =  path.join(moduleDir, module)
  const modulePath = path.join(moduleFolder, 'Module.js')
  const launcher = getModuleLauncher(moduleFolder)
  launch(module, launcher)(modulePath)
})

const setupModule = setup(moduleBaseDir)

export const startModules = () => fs.promises.readdir(moduleBaseDir).then(R.map(setupModule))

export const restartModule = (moduleName) => {
  killModule(moduleName)
  setupModule(moduleName)
}
