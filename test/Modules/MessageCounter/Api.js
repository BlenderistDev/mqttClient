require('../../../config/test/constants');
const assert = require('assert');
const Api = require('../../../src/Modules/MessageCounter/Api');
const MessagesCounter = require('../../../src/Modules/MessageCounter/model/MessagesCounter');

describe('MessageCounter module Api', async function() {
  beforeEach(async function() {
    await MessagesCounter.drop();
    await MessagesCounter.sync();
  });

  context('cmdGetList()', function() {
    it('Должен вернуться список счетчиков', async function() {
      oCounterData = {
        topic: 'topic',
        interval: 5,
      };
      await MessagesCounter.create(oCounterData);
      await MessagesCounter.create(oCounterData);

      const oApi = new Api();
      const aCounterList = await oApi.cmdGetList();
      assert.equal(aCounterList.length, 2);
    });
  });

  context('cmdUpdate()', function() {
    it('Должна обновиться запись счетчика в бд', async function() {
      oCounterData = {
        id: 3,
        topic: 'topic',
        interval: 5,
      };
      oCounterUpdateData = {
        id: 3,
        topic: 'new_topic',
        interval: 12,
      };
      await MessagesCounter.create(oCounterData);
      const oApi = new Api({
        body: {
          data: oCounterUpdateData,
        },
      });
      await oApi.cmdUpdate();
      const oRow = await MessagesCounter.getByPk(3);
      assert.deepEqual(oRow.dataValues, oCounterUpdateData);
    });
  });

  context('cmdCreate()', function() {
    it('Должна добавиться запись счетчика в бд', async function() {
      oCounterData = {
        id: 3,
        topic: 'topic',
        interval: 5,
      };
      const oApi = new Api({
        body: {
          data: oCounterData,
        },
      });
      await oApi.cmdCreate();
      const oRow = await MessagesCounter.getByPk(3);
      assert.deepEqual(oRow.dataValues, oCounterData);
    });
  });

  context('cmdDelete()', function() {
    it('Должна удалиться запись счетчика в бд', async function() {
      oCounterData = {
        id: 3,
        topic: 'topic',
        interval: 5,
      };
      await MessagesCounter.create(oCounterData);
      const oApi = new Api({
        body: {
          data: {
            'id': 3,
          },
        },
      });
      await oApi.cmdDelete();
      const oRow = await MessagesCounter.getByPk(3);
      assert.equal(oRow, null);
    });
  });
});
