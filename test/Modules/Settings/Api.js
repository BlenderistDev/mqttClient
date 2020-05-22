const path = require('path');
require('../../../config/test/constants');
const assert = require('assert');
const Api = require('../../../src/Modules/Settings/Api');

describe('Settings module Api', function() {
  context('cmdSetMqttServerAddress()', function() {
    it('Должен установиться адрес mqtt сервера', async function() {
      const sHost = 'mqtt://127.0.0.1';
      const oApi = new Api({
        body: {
          data: {
            mqttServerAddress: sHost,
          },
        },
      });
      await oApi.cmdSetMqttServerAddress();
      const mqttConfig = require(path.join(process.env.CONFIG_DIR, 'mqttConfig.json'));
      assert.equal(mqttConfig.host, sHost);
    });
  });

  context('cmdSetMqttUserName()', function() {
    it('Должно установиться имя пользователя mqtt сервера', async function() {
      const sName = 'test';
      const oApi = new Api({
        body: {
          data: {
            mqttUserName: sName,
          },
        },
      });
      await oApi.cmdSetMqttUserName();
      const mqttConfig = require(path.join(process.env.CONFIG_DIR, 'mqttConfig.json'));
      assert.equal(mqttConfig.username, sName);
    });
  });

  context('cmdSetMqttPassword()', function() {
    it('Должен установиться пароль пользователя mqtt сервера', async function() {
      const sPass = 'password';
      const oApi = new Api({
        body: {
          data: {
            mqttPassword: sPass,
          },
        },
      });
      await oApi.cmdSetMqttPassword();
      const mqttConfig = require(path.join(process.env.CONFIG_DIR, 'mqttConfig.json'));
      assert.equal(mqttConfig.password, sPass);
    });
  });

  context('cmdGetMqttSettings()', function() {
    it('Должен вернуться конфиг для подключения к mqtt серверу', async function() {
      const oApi = new Api();
      const oConfig = await oApi.cmdGetMqttSettings();
      assert.equal(oConfig, require(path.join(process.env.CONFIG_DIR, 'mqttConfig.json')));
    });
  });
});
