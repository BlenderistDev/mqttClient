import yaml from 'js-yaml';
import fs from 'fs';

const config = (function() {
  try {
    return yaml.safeLoad(fs.readFileSync('./config/config.yml', 'utf8'));
  } catch (e) {
    console.log('config not found, create new');
    const config = {
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
      },
    };
    fs.writeFile('./config/config.yml', yaml.safeDump(config), (err) => {
      if (err) throw err;
      throw Error('Config is empty');
    });
  }
})();

const db = config.database;
const mqtt = config.mqtt;
export {db, mqtt};
