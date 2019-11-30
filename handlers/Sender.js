const Senders = require('./model/Senders');

/**
 * Класс для управления отправителями
 */
class Sender {
  /**
   * Конструктор управления отправителями
   */
  constructor() {
    Senders.getTable().then((res) => {
      res.forEach((oRow) => {
        require(`../modules/${oRow.module}/Sender`);
      });
    });
  }
}

module.exports = Sender;
