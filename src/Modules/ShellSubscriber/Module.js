import shell from 'shelljs';
import { mqttClient } from '../../Components/SocketClient.js'
import { config } from "../../Components/ModuleConfig.js";

/**
* Производит замену меток и выполняет команду
* @param {string} sCommandTemplate
* @param {object} oReplaceData
*/
function executeCommand(sCommandTemplate, oReplaceData) {
  for (const sLabel in oReplaceData) {
    if ({}.hasOwnProperty.call(oReplaceData, sLabel)) {
      sCommandTemplate = sCommandTemplate.replace(`{{${sLabel}}}`, oReplaceData[sLabel]);
    }
  }
  shell.exec(sCommandTemplate);
}

mqttClient.on('message', (mqttMessage) => {
  if (config.topic === mqttMessage.topic) {
    executeCommand(config.commandTemplate, JSON.parse(mqttMessage.message))
  }
})
