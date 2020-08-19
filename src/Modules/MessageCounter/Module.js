import {MessagesCounter} from './model/MessagesCounter.js';
import {Counter} from './Counter.js';
import {ModulePrototype} from '../../core/index.js';

/**
 * Модуль для счетчиков сообщений за период
 */
export class Module extends ModulePrototype {
  /**
   * Создаем массив счетчиков
   */
  constructor() {
    super();
    this.aCounters = [];
    MessagesCounter.getTable().then((res) => {
      res.forEach((oCounterRow) => {
        this.aCounters.push(new Counter(oCounterRow.topic, oCounterRow.interval));
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

