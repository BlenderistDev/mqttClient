import yaml from 'js-yaml';
import fs from 'fs';

const defaultConfig = {
  database: {
    host: '',
    dbname: '',
    username: '',
    password: '',
    dialect: 'mysql',
  },
  mqtt: {
    host: '',
    username: '',
    password: '',
    topic: 'mqttClient',
  },
}


const loadConfig = () => {
  try {
    return yaml.safeLoad(fs.readFileSync('./config/config.yml', 'utf8'));
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

const config = loadConfig()

export const getConfig = (module) =>config[module]

export const setConfig = (module, moduleConfig) => {
  config[module] = moduleConfig
  writeConfig(config)
}
