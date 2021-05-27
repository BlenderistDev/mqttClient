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
checkDirExist(configFolder)

const writeConfig = config => fs.writeFileSync(configPath, yaml.safeDump(config))
const addId = R.when(R.is(Array), R.mapObjIndexed((config, key) => _.merge(config, { id: key })))

const loadConfig = R.tryCatch(
  () => _.forIn(yaml.safeLoad(fs.readFileSync(configPath, 'utf8')), addId),
  () => writeConfig(defaultConfig)
)

const setModuleConfig = (module, moduleConfig) => R.over(R.lensProp(module, config), () => moduleConfig, config)

let config = loadConfig()

export const reloadConfig = () => config = loadConfig()
export const getConfig = module => config[module]
export const setConfig = R.compose(reloadConfig, writeConfig, setModuleConfig)