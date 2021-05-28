import yaml from 'js-yaml'
import fs from 'fs'
import _ from "lodash"
import * as R from "ramda";

const configFolder = _.isUndefined(process.env.CONFIG_DIR) ? './config/' : process.env.CONFIG_DIR;
const configFileName = 'config.yml';
const configPath = configFolder + configFileName;

const defaultConfig = {
  Mqtt: {
    host: '',
    username: '',
    password: '',
    topic: 'mqttClient',
  }
}

const checkDirExist = R.unless(fs.existsSync, fs.mkdirSync)
const checkConfigDirExist = () => checkDirExist(configFolder)

const writeConfig = config => fs.writeFileSync(configPath, yaml.safeDump(config))
const writeDefaultConfig = () => writeConfig(defaultConfig)

const readConfig = () => yaml.safeLoad(fs.readFileSync(configPath, 'utf8'))
const addIdToConfig = (config, key) => config.id = key
const addId = R.when(R.is(Array), R.mapObjIndexed(addIdToConfig))
const getConfigWithIds = R.pipe(readConfig, R.forEachObjIndexed(addId))
const loadConfig = R.tryCatch(
  R.compose(getConfigWithIds, checkConfigDirExist),
  R.compose(getConfigWithIds, writeDefaultConfig)
)

const setModuleConfig = (module, moduleConfig) => R.over(
  R.lensProp(module, config),
  () => moduleConfig,
  config
)

let config = loadConfig()

export const reloadConfig = () => config = loadConfig()
export const getConfig = module => config[module]
export const setConfig = R.compose(reloadConfig, writeConfig, setModuleConfig)
