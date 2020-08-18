import {PingTable} from './model/Ping.js';
import {SenderPrototype} from '../../core/index.js';
/**
 * Класс для модуля пинга
 */
export class Sender extends SenderPrototype {
  /**
   * Конструктор отправителя модуля пинга
   */
  constructor() {
    super();
    PingTable.getTable().then((res) => {
      res.forEach((oSenderRow) => this.setPingSender(oSenderRow));
    });
  }

  /**
   * Устанавливает отправителя доя модуля
   * @param {object} oSenderRow
   */
  setPingSender(oSenderRow) {
    setInterval(() => {
      this.sendPingData(oSenderRow);
    }, oSenderRow.interval);
  }

  /**
   * Отправляет mqtt сообщение для пинга
   * @param {object} oSenderRow
   */
  sendPingData(oSenderRow) {
    const oPing = {
      timestamp: Date.now(),
      result_topic: oSenderRow.result_topic,
    };
    this.sendMessage(oSenderRow.measure_topic, JSON.stringify(oPing));
  }
}

