import yaml from 'js-yaml';
import fs from 'fs';
import _ from "lodash";
import {Some, None} from 'monet'

const defaultConfig = {
  mqtt: {
    host: '',
    username: '',
    password: '',
    topic: 'mqttClient',
  },
}

const writeConfig = config => fs.writeFileSync('./config/config.yml', yaml.safeDump(config))

const loadConfig = () => {
  try {
    let config = yaml.safeLoad(fs.readFileSync('./config/config.yml', 'utf8'))
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

export const getConfig = module => {
  return config[module]
}

export const setConfig = (module, moduleConfig) => {
  config[module] = moduleConfig
  writeConfig(_.mapValues(config, config => _.isArray(config) ? _.map(config, config => _.omit(config, ['id'])) : config))
  reloadConfig()
}
