import { getConfig } from './Config.js'
import { moduleDir } from "./Constants.js";
import fs from 'fs'
import path from 'path'
import { validateConfig } from './Validator.js'
import { sendNotification } from './Notification.js'
import { startModuleProcess, killModule } from './ModuleProcess.js'
import * as R from 'ramda'

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

const getError = (module) => {
  const error = {
    errors: {}
  };
  error.errors[module] = [`Skip module ${module}. Config is empty`];
  return error
}

const launch = (module, launcher) => R.pipe(
  checkModuleExist,
  R.andThen(() => getConfig(module)),
  R.andThen(
    R.ifElse(
      R.either(R.isEmpty, R.isNil),
      () => sendNotification(module, getError(module)),
      startModule(launcher)
    )
  ),
  R.otherwise(console.log),
  R.otherwise(() => console.log(`Module without logic: ${module}`)),
)

const setup = R.curry((moduleDir, module) => {
  const moduleFolder =  path.join(moduleDir, module)
  const modulePath = path.join(moduleFolder, 'Module.js')
  const launcher = getModuleLauncher(moduleFolder)
  launch(module, launcher)(modulePath)
})

const setupGroupModules = group => fs.promises.readdir(path.join(moduleDir, group))
  .then(R.map(setup(path.join(moduleDir, group))))

export const startModules = () => fs.promises.readdir(moduleDir).then(R.map(setupGroupModules))

export const restartModule = (name, group) => {
  killModule(name)
  setup(path.join(moduleDir, group), name)
}
