import {ModulePrototype} from '../../core/ModuleManager/ModulePrototype.js';
import md5 from 'md5';
import {ClickWatcher} from './Click.js';
import _ from 'lodash'

/**
 * Модуль для обработки двойных кликов
 */
export class Module extends ModulePrototype {
  /**
   * @param {string} moduleTopic
   * Создаем массив счетчиков
   */
  constructor(moduleTopic, config) {
    super(moduleTopic, config);
    this.clickWatcherList = [];
    _.map(this.config, row => {
      const click = new ClickWatcher(row, this.getResultTopic(row.in_topic));
      this.clickWatcherList.push(click);
    })
  }

  /**
   * Обработчик сообщения
   * @param {string} sTopic
   * @param {string} sMessage
   */
  handleMessage(sTopic, sMessage) {
    this.clickWatcherList.forEach((clickWatcher) => {
      if (clickWatcher.getInTopic() === sTopic) {
        const oMessage = JSON.parse(sMessage);
        clickWatcher.hangleClick(oMessage);
      }
    });
  }

  /**
   * Возвращает корневой топик для обработчика двойных кликов
   * @param {string} inTopic
   * @return {string}
   */
  getResultTopic(inTopic) {
    return this.getTopic() + '/' + md5(inTopic);
  }
}

