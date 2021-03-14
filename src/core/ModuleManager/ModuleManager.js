import {mqttClient, mqttPrefix} from '../index.js';
import { getConfigOption } from '../Config/Config.js'
import fs from 'fs';
import path from 'path';

/**
 * Класс для инициализации
 * и координации подписчиков
 */
class ModuleManager {
  /**
   * Инициализируем модули
   * и устанавливаем обработчик сообщений
   */
  start () {
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
    const sApiFilePath = path.join(process.env.MODULE_DIR, sModuleDir, 'Api.js');
    fs.promises.access(sModuleFilePath, fs.constants.R_OK).then(async () => {
      const Module = await import(sModuleFilePath);
      const oModule = new Module.Module(`${mqttPrefix}/${sModuleDir}`)
      oModule.Api = await fs.promises.access(sApiFilePath, fs.constants.R_OK).catch(() => false)
      oModule.name = sModuleDir
      oModule.getConfigOption = getConfigOption(sModuleDir)
      this.aModules.push(oModule);
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
const manager = new ModuleManager();
export const getManager = () => manager


