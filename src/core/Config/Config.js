import yaml from 'js-yaml';
import fs from 'fs';
import _ from 'lodash'

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
    fs.writeFileSync('./config/config.yml', yaml.safeDump(config), (err) => {
      if (err) throw err;
      throw Error('Config is empty');
    });
    return defaultConfig
  }
}

const config = loadConfig()
export const getConfigOption = _.curry((module, option) => {
  return number === false ? config[module][option] : config[module][number][option]
})

export const getModuleOptions = getConfigOption
