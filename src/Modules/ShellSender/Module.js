import shell from 'shelljs';
import {ModulePrototype, sendDiscoveryMessage} from '../../core/index.js';
import _ from 'lodash';

/**
 * Класс для модуля командной строки
 */
export class Module extends ModulePrototype {
  /**
   * Конструктор модуля командной строки
   */
  constructor(moduleTopic, config) {
    super(moduleTopic, config);
    _.map(this.config, sender => {
      const topic = `${this.getTopic()}/${sender.topic}`
      sendDiscoveryMessage(topic, topic, 'sensor', {});
      setInterval(() => {
        const oCommandLineSensorData = shell.exec(sender.command, {'silent': true})
        this.sendMessage(oCommandLineSensorData.toString(), topic)
      }, sender.interval);
    })
  }
}
