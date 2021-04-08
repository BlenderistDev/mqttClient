import shell from 'shelljs';
import _ from "lodash";

const config = JSON.parse(process.argv[2]);

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

process.on('message', (mqttMessage) => {
  _.chain(config.config)
    .filter(config => config.topic === mqttMessage.topic)
    .map(config => executeCommand(config.commandTemplate, JSON.parse(mqttMessage.message)))
    .value()
});
