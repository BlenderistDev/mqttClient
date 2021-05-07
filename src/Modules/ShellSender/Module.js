import shell from 'shelljs';
import {sendDiscoveryMessage} from '../../core/HomeAssistant.js';
import _ from 'lodash';
import md5 from 'md5'
import {mqttClient} from "../../core/SocketClient.js";
import { config, topic } from "../../Components/ModuleConfig.js";

_.map(config, sender => {
  const moduleTopic = `${topic}/${sender.topic}`
  sendDiscoveryMessage(md5(moduleTopic), moduleTopic, 'sensor', {});
  if (sender.command) {
    setInterval(() => mqttClient.send(moduleTopic, shell.exec(sender.command, {'silent': true}).toString()), sender.interval);
  }
})
