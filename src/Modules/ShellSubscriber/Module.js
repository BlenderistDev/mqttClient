import shell from 'shelljs';
import {ModulePrototype} from '../../core/index.js';
import _ from "lodash";

/**
 * Класс для модуля командной строки
 */
export class Module extends ModulePrototype {
  /**
   * @param {string} topic
   * @param {string} sMessage
   */
  handleMessage(topic, sMessage) {
    _.chain(this.config)
      .filter(config => config.topic === topic)
      .map(config => this.executeCommand(config.commandTemplate, JSON.parse(sMessage)))
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
}
