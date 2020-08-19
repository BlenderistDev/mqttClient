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
    this.aModules = [];
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
      this.setModule(sModuleDir);
    });
  }

  /**
   * Проверяем существование модуля в директории модуля
   * Если модуль есть - инициализируем и кэшируем
   * @param {string} sModuleDir
   */
  setModule(sModuleDir) {
    const sModuleFilePath = path.join(process.env.MODULE_DIR, sModuleDir, 'Module.js');
    fs.promises.access(sModuleFilePath, fs.constants.R_OK).then(async () => {
      const oModule = await import(sModuleFilePath);
      this.aModules.push(new oModule.Module());
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
      this.aModules.forEach((oModule) => {
        if (oModule.isTopicInSubscription(topic.toString())) {
          oModule.handleMessage(topic, message);
        }
      });
    });
  }
}

