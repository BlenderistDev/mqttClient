import { getConfig, setConfig } from './Config/Config.js'
import {mqttClient, mqttPrefix} from './Mqtt/MqttClient.js';
import {logger} from './Logger/Logger.js';
import {app} from './Api/app.js';
import {getModules, ModulePrototype} from './ModuleManager/index.js';
import {sendDiscoveryMessage} from './HomeAssistant/HomeAssistant.js';


export {
  mqttClient,
  mqttPrefix,
  logger,
  app,
  getModules,
  ModulePrototype,
  sendDiscoveryMessage,
  getConfig,
  setConfig
}

