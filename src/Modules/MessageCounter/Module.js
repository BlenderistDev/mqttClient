import {Counter} from './Counter.js';
import {ModulePrototype} from '../../core/ModuleManager/ModulePrototype.js';
import _ from 'lodash'

/**
 * Модуль для счетчиков сообщений за период
 */
export class Module extends ModulePrototype {
  /**
   * @param {string} moduleTopic
   * Создаем массив счетчиков
   */
  constructor(moduleTopic, config) {
    super(moduleTopic, config);
    this.aCounters = _.map(this.config, row => {
      const counterName = `messages_in_${row.interval}_sec`;
      const counterTopic = `${this.getTopic()}/${counterName}`;
      return new Counter(counterTopic, row.interval, counterName);
    })
  }

  /**
   * Обработчик сообщения
   * @param {string} sTopic
   * @param {string} sMessage
   */
  handleMessage(sTopic, sMessage) {
    this.aCounters.forEach((oCounter) => {
      oCounter.increase();
    });
  }
}

