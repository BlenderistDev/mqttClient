require('../../../config/test/constants');
const assert = require('assert');
Api = require('../../../src/Modules/Main/Api');

describe('Main module Api', async function() {
  beforeEach(async function() {
    await Subscriptions.drop();
    await Subscriptions.sync();
  });

  context('cmdCreateSubscriber()', function() {
    it('Должна создаться запись с подписчиком в бд', async function() {
      const iOldSubscribersCount = await Subscriptions.count();
      oSubscriptionData = {
        topic: 'topic',
        module: 'module',
      };
      const oApi = new Api({
        body: {
          data: oSubscriptionData,
        },
      });
      await oApi.cmdCreateSubscriber();
      const iNewSubscribersCount = await Subscriptions.count();
      assert.equal(iNewSubscribersCount - 1, iOldSubscribersCount);
    });
  });

  context('cmdDeleteSubscriber()', function() {
    it('Должна удалиться запись из бд', async function() {
      oSubscriptionData = {
        id: 12,
        topic: 'topic',
        module: 'module',
      };
      await Subscriptions.create(oSubscriptionData);
      const iOldSubscribersCount = await Subscriptions.count();
      oApi = new Api({
        body: {
          data: {
            id: 12,
          },
        },
      });
      await oApi.cmdDeleteSubscriber();
      const iNewSubscribersCount = await Subscriptions.count();
      assert.equal(iNewSubscribersCount + 1, iOldSubscribersCount);
    });
  });

  context('cmdUpdateSubscriber()', function() {
    it('Должна обновиться запись в бд', async function() {
      oSubscriptionData = {
        id: 12,
        topic: 'topic',
        module: 'module',
      };
      oSubscriptionUpdateData = {
        id: 12,
        topic: 'new_topic',
        module: 'module',
      };
      await Subscriptions.create(oSubscriptionData);
      oApi = new Api({
        body: {
          data: oSubscriptionUpdateData,
        },
      });
      await oApi.cmdUpdateSubscriber();
      const oRow = await Subscriptions.getByPk(12);
      assert.equal(oRow.topic, oSubscriptionUpdateData.topic);
    });
  });

  context('cmdGetModuleSubscriptions()', function() {
    it('Должны вернуться все подписки модуля', async function() {
      oFirstSubscriptionData = {
        topic: 'topic_1',
        module: 'module_1',
      };
      oSecondSubscriptionData = {
        topic: 'topic_2',
        module: 'module_1',
      };
      oThirdSubscriptionData = {
        topic: 'topic_3',
        module: 'module_2',
      };
      await Subscriptions.create(oFirstSubscriptionData);
      await Subscriptions.create(oSecondSubscriptionData);
      await Subscriptions.create(oThirdSubscriptionData);
      oApi = new Api({
        body: {
          data: {
            module: 'module_1',
          },
        },
      });
      const aSubscribtions = await oApi.cmdGetModuleSubscriptions();
      let bAllRowsCorrect = true;
      aSubscribtions.forEach((oSubscription) => {
        if (oSubscription.module !== 'module_1') {
          bAllRowsCorrect = false;
        }
      });
      assert.equal(bAllRowsCorrect, true);
    });
  });
});
