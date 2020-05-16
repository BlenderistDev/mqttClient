const shell = require('shelljs');
const MqttClient = require('../../core/index').mqtt;
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
          const oCommandLineSensorData = shell.exec(oSenderRow.command, {'silent': false});
          MqttClient.publish(oSenderRow.topic, oCommandLineSensorData.toString());
        }, oSenderRow.interval);
      });
    });
  }
}

module.export = new Sender();
