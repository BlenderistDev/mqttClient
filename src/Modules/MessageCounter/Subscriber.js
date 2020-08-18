import {MessagesCounter} from './model/MessagesCounter.js';
import {Counter} from './Counter.js';
import {SubscriberPrototype} from '../../core/ModuleManager/SubscriberPrototype.js';

/**
 * Подписчик для счетчиков сообщений за период
 */
export class Subscriber extends SubscriberPrototype {
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

