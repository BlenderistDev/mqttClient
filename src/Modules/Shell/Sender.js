import shell from 'shelljs';
import {ShellSenders} from './model/ShellSenders.js';
import {SenderPrototype} from '../../core/index.js';
/**
 * Класс для отправителя сенсора командной строки
 */
export class Sender extends SenderPrototype {
  /**
   * Конструктор отправителя сенсора командной строки
   */
  constructor() {
    super();
    ShellSenders.getTable().then((res) => {
      res.forEach((oSenderRow) => {
        setInterval(() => {
          const oCommandLineSensorData = shell.exec(oSenderRow.command, {'silent': false});
          this.sendMessage(oSenderRow.topic, oCommandLineSensorData.toString());
        }, oSenderRow.interval);
      });
    });
  }
}
