import shell from 'shelljs';
import {ShellSenders} from './model/ShellSenders.js';
import {ModulePrototype} from '../../core/index.js';
import {ShellSubscriptions} from './model/ShellSubscriptions.js';
/**
 * Класс для модуля командной строки
 */
export class Module extends ModulePrototype {
  /**
   * Конструктор модуля командной строки
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

  /**
   * @param {string} sTopic
   * @param {string} sMessage
   */
  handleMessage(sTopic, sMessage) {
    const oMessage = JSON.parse(sMessage);
    const sCmd = oMessage.cmd;
    const oReplaceData = oMessage.data;
    ShellSubscriptions.getByCmd(sCmd).then((res)=>{
      res.forEach((oRow) => {
        this.executeCommand(oRow.commandTemplate, oReplaceData);
      });
    });
  }

  /**
   * Производит замену меток и выполняет команду
   * @param {string} sCommandTemplate
   * @param {object} oReplaceData
   */
  executeCommand(sCommandTemplate, oReplaceData) {
    for (const sLabel in oReplaceData) {
      if ({}.hasOwnProperty.call(oReplaceData, sLabel)) {
        sCommandTemplate = sCommandTemplate.replace(`{{${sLabel}}}`, oReplaceData[sLabel]);
      }
    }
    shell.exec(sCommandTemplate, {
      // 'silent': true
    });
  }

  isTopicInSubscription(sTopic) {
    return (sTopic === '/notebook/shell');
  }
}
