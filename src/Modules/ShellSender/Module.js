import shell from 'shelljs';
import {sendDiscoveryMessage} from '../../core/HomeAssistant/HomeAssistant.js';
import {mqttClient} from '../../core/Mqtt/MqttClient.js';
import _ from 'lodash';
import md5 from 'md5'

const config = JSON.parse(process.argv[2]);

_.map(config.config, sender => {
  const topic = `${config.topic}/${sender.topic}`
  sendDiscoveryMessage(md5(topic), topic, 'sensor', {});
  setInterval(() => mqttClient.sendMessage(topic, shell.exec(sender.command, {'silent': true}).toString()), sender.interval);
})
