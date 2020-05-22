require('../../../config/test/constants');
const assert = require('assert');
Subscriptions = require('../../../src/Modules/Main/model/Subscriptions');

describe('Subscriptions model', function() {
  beforeEach(async function() {
    await Subscriptions.drop();
    await Subscriptions.sync();

    oFirstSubscriptionData = {
      topic: 'topic',
      module: 'module',
    };

    oSecondSubscriptionData = {
      topic: 'another_topic',
      module: 'another_module',
    };

    await Subscriptions.create(oFirstSubscriptionData);
    await Subscriptions.create(oSecondSubscriptionData);
  });

  context('getByTopic()', function() {
    it('Для тестовых данных должна вернуться только одна запись', async function() {
      const aRows = await Subscriptions.getByTopic(oFirstSubscriptionData.topic);
      assert.equal(aRows.length, 1);
    });

    it('Должна вернуться запись с запрошенным топиком', async function() {
      const oRow = (await Subscriptions.getByTopic(oFirstSubscriptionData.topic)).pop();
      assert.equal(oRow.get('topic'), oFirstSubscriptionData.topic);
    });

    it('При запросе несуществующего топика должно вернуться ноль строк', async function() {
      const aRows = await Subscriptions.getByTopic('not_exist_topic');
      assert.equal(aRows.length, 0);
    });
  });

  context('getByModule()', function() {
    it('Для тестовых данных должна вернуться только одна запись', async function() {
      const aRows = await Subscriptions.getByModule(oFirstSubscriptionData.module);
      assert.equal(aRows.length, 1);
    });

    it('Должна вернуться запись с запрошенным модулем', async function() {
      const oRow = (await Subscriptions.getByModule(oFirstSubscriptionData.module)).pop();
      assert.equal(oRow.get('topic'), oFirstSubscriptionData.topic);
    });

    it('При запросе несуществующего модуля должно вернуться ноль строк', async function() {
      const aRows = await Subscriptions.getByModule('not_exist_module');
      assert.equal(aRows.length, 0);
    });
  });
});
