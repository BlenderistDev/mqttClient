import yaml from 'js-yaml';
import fs from 'fs';
import _ from "lodash";

const defaultConfig = {
  mqtt: {
    host: '',
    username: '',
    password: '',
    topic: 'mqttClient',
  },
}


const loadConfig = () => {
  try {
    let config = yaml.safeLoad(fs.readFileSync('./config/config.yml', 'utf8'))
    return _.forIn(config, config => {
      if (_.isArray(config)) {
        return _.map(config, (config, key) => {
          config.id = key
          return config
        })
      } else {
        return config
      }
    })
  } catch (e) {
    console.log('config not found, create new');
    writeConfig(defaultConfig)
    return defaultConfig
  }
}

const writeConfig = (config) => {
  fs.writeFileSync('./config/config.yml', yaml.safeDump(config), err => {
    if (err) {
      throw err
    }
  });
}

let config = loadConfig()

export const reloadConfig = () => {
  config = loadConfig();
}

export const getConfig = (module) => {
  return config[module]
}

export const setConfig = (module, moduleConfig) => {
  config[module] = moduleConfig
  writeConfig(config)
  config = loadConfig()
}
