require('../../../config/test/constants');
const assert = require('assert');
const ModelPrototype = require('../../../src/core/index').modelPrototype;
const sequelize = ModelPrototype.sequelize;
const Sequelize = require('sequelize');

/**
 * Класс для тестирования прототипа модели
 */
class Model extends ModelPrototype {}

Model.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  test_field: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
}, {sequelize, modelName: 'model_prototype_tests'});


const oModel = new Model();

describe('modelPrototype', function() {
  oInsertData = {
    test_field: 'test',
  };

  beforeEach(async function() {
    await Model.drop();
    await Model.sync();
  });

  context('create()', function() {
    it('должна добавиться строка в базу данных', async function() {
      await oModel.create(oInsertData);
      const data = await sequelize.query('SELECT * FROM `model_prototype_tests`', {type: Sequelize.QueryTypes.SELECT});
      assert.equal(data.length, 1);
    });
    it('Поле должно сохранится без изменений', async function() {
      await oModel.create(oInsertData);
      const data = await sequelize.query('SELECT * FROM `model_prototype_tests`', {type: Sequelize.QueryTypes.SELECT});
      const oRow = data.pop();
      assert.equal(oRow.test_field, oInsertData.test_field);
    });
  });

  context('getTable()', function() {
    it('должен вернуться массив со всеми строками таблицы', async function() {
      await Model.create(oInsertData);
      await Model.create(oInsertData);
      await Model.create(oInsertData);
      const aTableData = await oModel.getTable();
      assert.equal(aTableData.length, 3);
    });
  });

  context('getByPk()', function() {
    it('должен вернуть запись по первичному ключу', async function() {
      const oData = {
        'id': 5,
        'test_field': 'test',
      };
      await Model.create(oData);
      const oRow = await oModel.getByPk(5);
      assert.equal(oRow.test_field, oData.test_field);
    });
  });

  context('removeByPk()', function() {
    it('должен удалить запись по первичному ключу', async function() {
      const oData = {
        'id': 12,
        'test_field': 'test',
      };
      await Model.create(oData);
      await oModel.removeByPk(12);
      const aTableData = await sequelize.query('SELECT * FROM `model_prototype_tests`', {type: Sequelize.QueryTypes.SELECT});
      assert.equal(aTableData.length, 0);
    });
  });
});
