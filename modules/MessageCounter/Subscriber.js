const MessagesCounter = require('./model/MessagesCounter');
const Counter = require('./Counter');

/**
 * Подписчик для счетчиков сообщений за период
 */
class MessageCounter {
  /**
   * Создаем массив счетчиков
   */
  constructor() {
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

module.exports = new MessageCounter();
