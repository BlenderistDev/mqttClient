require('../../../config/test/constants');
const assert = require('assert');
ShellSubscriptions = require('../../../src/Modules/Shell/model/ShellSubscriptions');
Subscriptions = require('../../../src/Modules/Main/model/Subscriptions');

describe('ShellSubscriptions model', function() {
  beforeEach(async function() {
    await ShellSubscriptions.drop();
    await ShellSubscriptions.sync();

    oFirstShellSubscriptionData = {
      cmd: 'cmd',
      commandTemplate: 'commandTemplate',
    };

    oSecondShellSubscriptionData = {
      cmd: 'another_cmd',
      commandTemplate: 'another_commandTemplate',
    };

    await ShellSubscriptions.create(oFirstShellSubscriptionData);
    await ShellSubscriptions.create(oSecondShellSubscriptionData);
  });

  context('getByCmd()', function() {
    it('Для тестовых данных должна вернуться только одна запись', async function() {
      const aRows = await ShellSubscriptions.getByCmd(oFirstShellSubscriptionData.cmd);
      assert.equal(aRows.length, 1);
    });

    it('Должна вернуться запись с запрошенной командой', async function() {
      const oRow = (await ShellSubscriptions.getByCmd(oFirstShellSubscriptionData.cmd)).pop();
      assert.equal(oRow.get('cmd'), oFirstShellSubscriptionData.cmd);
    });

    it('При запросе несуществующей команды должно вернуться ноль строк', async function() {
      const aRows = await ShellSubscriptions.getByCmd('not_exist_cmd');
      assert.equal(aRows.length, 0);
    });
  });
});
