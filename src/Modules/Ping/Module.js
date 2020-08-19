import {PingTable} from './model/Ping.js';
import {ModulePrototype} from '../../core/index.js';
/**
 * Класс для модуля пинга
 */
export class Module extends ModulePrototype {
  /**
   * Конструктор модуля пинга
   */
  constructor() {
    super();
    PingTable.getTable().then((res) => {
      res.forEach((oSenderRow) => this.setPingSender(oSenderRow));
    });
  }

  /**
   * Устанавливает отправителя для модуля
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

  /**
   * @param {string} sTopic
   * @param {string} sMessage
   */
  handleMessage(sTopic, sMessage) {
    const oMessage = JSON.parse(sMessage);
    const iPing = (Date.now() - JSON.parse(sMessage).timestamp)/1000;
    this.sendMessage(oMessage.result_topic, iPing.toString());
  }

  isTopicInSubscription(sTopic) {
    return sTopic === '/mqtt/ping/measure';
  }
}

