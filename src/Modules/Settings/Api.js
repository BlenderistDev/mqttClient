const ApiPrototype = require('../../core/index').ApiPrototype;
const fsPromises = require('fs').promises;

/**
 * класс Api для настроек
 */
class Api extends ApiPrototype {
  /**
   * Устанавливаем адрес mqtt сервера
   * @return {promise}
   */
  cmdSetMqttServerAddress() {
    const mqttConfig = require(path.join(process.env.CONFIG_DIR, 'mqttConfig.json'));
    mqttConfig.host = this.data.mqttServerAddress;
    return this.saveConfigFile('mqttConfig.json', mqttConfig);
  }

  /**
   * Устанавливаем имя пользователя mqtt сервера
   * @return {promise}
   */
  cmdSetMqttUserName() {
    const mqttConfig = require(path.join(process.env.CONFIG_DIR, 'mqttConfig.json'));
    mqttConfig.username = this.data.mqttUserName;
    return this.saveConfigFile('mqttConfig.json', mqttConfig);
  }

  /**
   * Устанавливаем пароль mqtt сервера
   * @return {promise}
   */
  cmdSetMqttPassword() {
    const mqttConfig = require(path.join(process.env.CONFIG_DIR, 'mqttConfig.json'));
    mqttConfig.password = this.data.mqttPassword;
    return this.saveConfigFile('mqttConfig.json', mqttConfig);
  }

  /**
   * Возвращает параметры mqtt сервера
   * @return {object}
   */
  cmdGetMqttSettings() {
    return require(path.join(process.env.CONFIG_DIR, 'mqttConfig.json'));
  }

  /**
   * Сохраняет файл с конфигом mqtt сервера
   * @param {String} sFileName
   * @param {Object} oData
   * @return {promise}
   */
  saveConfigFile(sFileName, oData) {
    return fsPromises.writeFile(path.join(process.env.CONFIG_DIR, sFileName), JSON.stringify(oData, null, 2)).then(() => {
      return this.cmdGetMqttSettings();
    });
  }
}

module.exports = Api;
