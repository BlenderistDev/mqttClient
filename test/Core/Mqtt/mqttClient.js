require('../../../config/constants');
const assert = require('assert');

describe('mqttClient', function() {
  context('getConnection', function() {
    it('должен вернуться объект подключения к mqtt серверу', function() {
      const mqtt = require('mqtt');
      const oMqttClient = require('../../../src/core/Mqtt/MqttClient');
      assert.equal(oMqttClient instanceof mqtt.MqttClient, true);
    });
  });
});
