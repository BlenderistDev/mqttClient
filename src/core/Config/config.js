import yaml from 'js-yaml';
import fs from 'fs';

const config = (function() {
  try {
    return yaml.safeLoad(fs.readFileSync('./config/config.yml', 'utf8'));
  } catch (e) {
    console.log('config not found, create new');
    const config = {
      mqtt: {
        host: '',
        username: '',
        password: '',
        topic: 'mqttClient',
      },
    };
    fs.writeFile('./config/config.yml', yaml.safeDump(config), (err) => {
      if (err) throw err;
      throw Error('Config is empty');
    });
  }
})();


/**
 * @param {array} aModuleList
 */
async function getModulesDefaultConfig(aModuleList) {
  aModuleList.forEach(oModule => {
    
  });
}

export {config};
