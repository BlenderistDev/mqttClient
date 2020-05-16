require('../../config/constants');
const assert = require('assert');

describe('Database', function() {
  context('getConnection', function() {
    it('должен вернуться объект подключения к базе данных', function() {
      const Sequelize = require('sequelize');
      const oDatabaseClient = require('../../src/core/Database/DatabaseClient');
      assert.equal(oDatabaseClient instanceof Sequelize, true);
    });
  });
});
