const shell = require('shelljs');
const ShellSubscriptions = require('./model/ShellSubscriptions');

/**
 * mqtt Подписчик для выполнения shell команд
 */
class ShellSubscriber {
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
    shell.exec(sCommandTemplate, {'silent': true});
  }
}

module.exports = new ShellSubscriber();
