import yaml from 'js-yaml'
import fs from 'fs'
import _ from "lodash"
import * as R from "ramda";

const configFolder = _.isUndefined(process.env.CONFIG_DIR) ? './config/' : process.env.CONFIG_DIR;
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
    const config = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'))
    return _.forIn(config, config => _.isArray(config) ? _.map(config, (config, key) => _.merge(config, { id: key })) : config)
  } catch (e) {
    writeConfig(defaultConfig)
    return defaultConfig
  }
}
const setModuleConfig = (module, moduleConfig) => R.over(R.lensProp(module, config), () => moduleConfig, config)

let config = loadConfig()

export const reloadConfig = () => config = loadConfig()
export const getConfig = module => config[module]
export const setConfig = R.compose(reloadConfig, writeConfig, setModuleConfig)
