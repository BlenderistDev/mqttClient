const MqttClient = require('../../core/index').mqtt;
const PingTable = require('./model/Ping');
/**
 * Класс для модуля пинга
 */
class Sender {
  /**
   * Конструктор отправителя модуля пинга
   */
  constructor() {
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
      this.sendPingData(oSenderRow)
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
    }
    MqttClient.publish(oSenderRow.measure_topic, JSON.stringify(oPing));
  }
}

module.export = new Sender();
