import { getConfig, setConfig } from './Config/Config.js'
import {mqttClient, mqttPrefix} from './Mqtt/MqttClient.js';
import {logger} from './Logger/Logger.js';
import {app} from './Api/app.js';
import {getManager, ModulePrototype} from './ModuleManager/index.js';
import {sendDiscoveryMessage} from './HomeAssistant/HomeAssistant.js';


export {
  mqttClient,
  mqttPrefix,
  logger,
  app,
  getManager,
  ModulePrototype,
  sendDiscoveryMessage,
  getConfig,
  setConfig
}

