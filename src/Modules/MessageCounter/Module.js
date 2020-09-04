import {MessagesCounter} from './model/MessagesCounter.js';
import {Counter} from './Counter.js';
import {ModulePrototype} from '../../core/index.js';

/**
 * Модуль для счетчиков сообщений за период
 */
export class Module extends ModulePrototype {
  /**
   * @param {string} moduleTopic
   * Создаем массив счетчиков
   */
  constructor(moduleTopic) {
    super(moduleTopic);
    this.aCounters = [];
    MessagesCounter.getTable().then((res) => {
      res.forEach((oCounterRow) => {
        const counterName = `messages_in_${oCounterRow.interval}_sec`;
        const counterTopic = `${this.getTopic()}/${counterName}`;
        this.aCounters.push(new Counter(counterTopic, oCounterRow.interval, counterName));
      });
    });
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

