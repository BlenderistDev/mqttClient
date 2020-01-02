const shell = require('shelljs');
const MqttClient = require('../../mqtt/MqttClient');
const ShellSenders = require('./model/ShellSenders');
/**
 * Класс для отправителя сенсора командной строки
 */
class Sender {
  /**
   * Конструктор отправителя сенсора командной строки
   */
  constructor() {
    ShellSenders.getTable().then((res) => {
      res.forEach((oSenderRow) => {
        setInterval(() => {
          const oCommandLineSensorData = shell.exec(oSenderRow.command, {'silent': true});
          MqttClient.publish(oSenderRow.topic, oCommandLineSensorData.toString());
        }, oSenderRow.interval);
      });
    });
  }
}

module.export = new Sender();
