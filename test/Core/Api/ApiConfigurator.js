require('../../../config/constants');

const assert = require('assert');
const ApiConfigurator = require('../../../src/core/Api/ApiConfigurator');

describe('ApiConfigurator', function() {
  context('getPort()', function() {
    it('Порт должен быть положительным числом', function() {
      assert.equal(ApiConfigurator.getPort() > 0, true);
    });
  });
  context('normalizePort()', function() {
    it('Порт должен быть целым числом', function() {
      assert.equal(Number.isInteger(ApiConfigurator.normalizePort(1000)), true);
    });
  });
  context('normalizePort()', function() {
    it('Если целое число передано как строка - оно должно стать целым числом', function() {
      assert.equal(Number.isInteger(ApiConfigurator.normalizePort('1000')), true);
    });
  });
  context('normalizePort()', function() {
    it('Если порт не удалось нормализовать до целого числа - должна быть ошибка с "Port is not valid"', function() {
      assert.throws(() => Number.isInteger(ApiConfigurator.normalizePort('test')), {message: 'Port is not valid'});
    });
  });
});
