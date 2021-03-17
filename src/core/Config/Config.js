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
    fs.writeFileSync('./config/config.yml', yaml.safeDump(defaultConfig), (err) => {
      if (err) throw err;
      throw Error('Config is empty');
    });
    return defaultConfig
  }
}

const config = loadConfig()
export const getConfig = (module) =>config[module]
