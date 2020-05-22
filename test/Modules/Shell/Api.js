require('../../../config/test/constants');
const assert = require('assert');
const Api = require('../../../src/Modules/Shell/Api');
const ShellSenders = require('../../../src/Modules/Shell/model/ShellSenders');
const ShellSubscriptions = require('../../../src/Modules/Shell/model/ShellSubscriptions');

describe('Shell module Api', async function() {
  const oRequest = {
    body: {
      data: {},
    },
  };
  let iRandomId;
  beforeEach(async function() {
    iRandomId = Math.floor(Math.random() * 10);
  });

  describe('Апи для подписчиков', function() {
    beforeEach(async function() {
      await ShellSubscriptions.drop();
      await ShellSubscriptions.sync();
    });

    context('cmdGetList()', function() {
      it('Должны вернуться все подписчики модуля', async function() {
        const oSubscriber = {
          cmd: 'cmd',
          commandTemplate: 'commandTemplate',
        };
        await ShellSubscriptions.create(oSubscriber);
        await ShellSubscriptions.create(oSubscriber);
        await ShellSubscriptions.create(oSubscriber);

        const oApi = new Api();
        const aSubscriberList = await oApi.cmdGetList();
        assert.equal(aSubscriberList.length, await ShellSubscriptions.count());
      });
    });

    context('cmdUpdate()', function() {
      it('Должна обновиться запись подписчика в бд', async function() {
        const oSubscriberData = {
          id: 4,
          cmd: 'cmd',
          commandTemplate: 'topcommandTemplate',
        };
        const oSubscriberUpdateData = {
          id: 4,
          cmd: 'cmd',
          commandTemplate: 'topcommandTemplate',
        };
        await ShellSubscriptions.create(oSubscriberData);
        const oApi = new Api({
          body: {
            data: oSubscriberUpdateData,
          },
        });
        await oApi.cmdUpdate();
        const oRow = await ShellSubscriptions.getByPk(4);
        assert.deepEqual(oRow.dataValues, oSubscriberUpdateData);
      });
    });

    context('cmdCreate()', function() {
      it('Должна добавиться запись подписчика в бд', async function() {
        oSubscriberData = {
          id: 4,
          cmd: 'cmd',
          commandTemplate: 'commandTemplate',
        };
        const oApi = new Api({
          body: {
            data: oSubscriberData,
          },
        });
        await oApi.cmdCreate();
        const oRow = await ShellSubscriptions.getByPk(4);
        assert.deepEqual(oRow.dataValues, oSubscriberData);
      });
    });

    context('cmdDelete()', function() {
      it('Должна удалиться запись подписчика из бд', async function() {
        oSubscriberData = {
          id: 4,
          cmd: 'cmd',
          commandTemplate: 'commandTemplate',
        };
        await ShellSubscriptions.create(oSubscriberData);
        const oApi = new Api({
          body: {
            data: {
              'id': 4,
            },
          },
        });
        await oApi.cmdDelete();
        const oRow = await ShellSubscriptions.getByPk(4);
        assert.equal(oRow, null);
      });
    });
  });

  describe('Апи для отправителей', function() {
    const oSender = {
      command: 'command',
      topic: 'topic',
      interval: '5',
    };
    beforeEach(async function() {
      await ShellSenders.drop();
      await ShellSenders.sync();
    });

    context('cmdGetSenderList()', function() {
      it('Должны вернуться все отправители модуля', async function() {
        await ShellSenders.create(oSender);
        await ShellSenders.create(oSender);
        await ShellSenders.create(oSender);
        const oApi = new Api();
        const aSenderList = await oApi.cmdGetSenderList();
        assert.equal(aSenderList.length, await ShellSenders.count());
      });
    });

    context('cmdCreateSender()', function() {
      it('Должен создаться отправитель модуля', async function() {
        oSender.id = 12;
        oRequest.body.data = oSender;
        const oApi = new Api(oRequest);
        const oShellSender = await oApi.cmdCreateSender();
        assert.deepEqual(oShellSender.get(), oSender);
      });
    });

    context('cmdDeleteSender()', function() {
      it('Должен удалиться отправитель модуля', async function() {
        oSender.id = iRandomId;
        await ShellSenders.create(oSender);
        oRequest.body.data.id = iRandomId;
        const oApi = new Api(oRequest);
        await oApi.cmdDeleteSender();
        assert.equal(await ShellSenders.getByPk(iRandomId), null);
      });
    });

    context('cmdUpdateSender()', function() {
      it('Должен обновиться отправитель модуля', async function() {
        oSender.id = iRandomId;
        await ShellSenders.create(oSender);
        oSender.command = 'new_command';
        oSender.topic = 'new_topic';
        oRequest.body.data = oSender;
        const oApi = new Api(oRequest);
        await oApi.cmdUpdateSender();

        oShellSender = await ShellSenders.getByPk(iRandomId);
        assert.deepEqual(oShellSender.get(), oSender);
      });
    });
  });
});
