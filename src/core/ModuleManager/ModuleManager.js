import {mqttClient} from '../index.js';
import fs from 'fs';
import path from 'path';

/**
 * Класс для инициализации
 * и координации подписчиков
 */
export class ModuleManager {
  /**
   * Инициализируем модули
   * и устанавливаем обработчик сообщений
   */
  constructor() {
    this.aSubscirbers = [];
    this.setModules();
    this.setMessageHandler();
  }

  /**
   * Инициализация модулей
   * Сканируем директорию модулей
   * Инициализируем подписчиков и отправителей модулей
   */
  async setModules() {
    const aModuleDirList = await fs.promises.readdir(process.env.MODULE_DIR);
    aModuleDirList.forEach((sModuleDir) => {
      this.setSubscriber(sModuleDir);
      this.setSender(sModuleDir);
    });
  }

  /**
   * Проверяем существование подписчика в директории модуля
   * Если подписчик есть - инициализируем и кэшируем
   * @param {string} sModuleDir
   */
  setSubscriber(sModuleDir) {
    const sSubscriberFilePath = path.join(process.env.MODULE_DIR, sModuleDir, 'Subscriber.js');

    fs.promises.access(sSubscriberFilePath, fs.constants.R_OK).then(async () => {
      const oSubscriber = await import(sSubscriberFilePath);
      this.aSubscirbers.push(new oSubscriber.Subscriber());
    }).catch((err) => {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    });
  }

  /**
   * Проверяем существование отправителя в директории модуля
   * Если он существует - инициализируем
   * @param {string} sModuleDir
   */
  setSender(sModuleDir) {
    const sSenderFilePath = path.join(process.env.MODULE_DIR, sModuleDir, 'Sender.js');
    fs.promises.access(sSenderFilePath, fs.constants.R_OK).then(async () => {
      const oSender = await import(sSenderFilePath);
      new oSender.Sender();
    }).catch((err) => {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    });
  }

  /**
   * Устанавливаем обработчик сообщений
   */
  async setMessageHandler() {
    mqttClient.on('message', (topic, message) => {
      this.aSubscirbers.forEach((oSubscriber) => {
        if (oSubscriber.isTopicInSubscription(topic.toString())) {
          oSubscriber.handleMessage(topic, message);
        }
      });
    });
  }
}

