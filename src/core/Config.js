import yaml from 'js-yaml'
import fs from 'fs'
import _ from "lodash"
import * as R from "ramda";

const configFolder = './config/';
const configFileName = 'config.yml';
const configPath = configFolder + configFileName;

const defaultConfig = {
  mqtt: {
    host: '',
    username: '',
    password: '',
    topic: 'mqttClient',
  }
}

if (!fs.existsSync(configFolder)) {
  fs.mkdirSync(configFolder);
}

const writeConfig = config => fs.writeFileSync(configPath, yaml.safeDump(config))

const loadConfig = () => {
  try {
    let config = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'))
    return _.forIn(config, config => _.isArray(config) ? _.map(config, (config, key) => _.merge(config, { id: key })) : config)
  } catch (e) {
    writeConfig(defaultConfig)
    return defaultConfig
  }
}

let config = loadConfig()

export const reloadConfig = () => {
  config = loadConfig()
}

export const getConfig = module => config[module]

const setModuleConfig = (module, moduleConfig) => R.over(R.lensProp(module, config), () => moduleConfig, config)

export const setConfig = R.compose(reloadConfig, writeConfig, setModuleConfig)