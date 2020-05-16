require('../../config/constants');

const assert = require('assert');

const RequestHandler = require('../../src/core/Api/RequestHandler');
const ApiPrototype = require('../../src/core/Api/ApiPrototype');
const fsPromises = require('fs').promises;

describe('RequestHandler', async function() {
  aModuleDirList = await fsPromises.readdir('./src/Modules');
  aModuleDirList.forEach(async (sDirName) => {
    bIsApiExist = await fsPromises.access(`./src/Modules/${sDirName}/Api.js`).then(() => {
      return true;
    }).catch(() => {
      return false;
    });
    if (bIsApiExist) {
      describe(`Проверяем подключение модуля API ${sDirName} в RequestHandler`, async function() {
        context('getModuleApi()', async function() {
          it(`Должен вернуться объект модуля ${sDirName}, являющийся наследником ApiPrototype`, async function() {
            const oRequestHandler = new RequestHandler({
              body: {
                'module': sDirName,
              },
            });
            const oApiController = await oRequestHandler.getModuleApi(sDirName, {});
            assert.equal(oApiController instanceof ApiPrototype, true);
          });
        });
      });
    }
  });
  describe('Проверяем подключение несуществующего модуля API в RequestHandler', async function() {
    context('getModuleApi()', function() {
      it(`При запросе несуществующего модуля должна быть выброшена ошибка`, function(done) {
        const oRequestHandler = new RequestHandler({
          body: {
            'module': 'NotExistModule',
          },
        });
        oRequestHandler.getModuleApi().catch((err) => {
          done();
        });
      });
    });
  });
});

describe('RequestHandler', () => {
  const sCmd = 'cmd';
  const sModule = 'module';
  const oRequestHandler = new RequestHandler({
    body: {
      'cmd': sCmd,
      'module': sModule,
    },
  });
  context('toUpperCaseFirstLetter', () => {
    it('проверяем замену первой буквы на заглавную', (done) => {
      const sStr = 'test';
      const sProcessedStr = oRequestHandler.toUpperCaseFirstLetter(sStr);
      if (sStr[0].toUpperCase() === sProcessedStr[0]) {
        done();
      }
    });
  });
  context('get cmd()', () => {
    it('проверяем корректное получение cmd из объекта запроса', () => {
      assert.equal(oRequestHandler.cmd, oRequestHandler.toUpperCaseFirstLetter(sCmd));
    });
  });
  context('get module()', () => {
    it('проверяем корректное получение имени модуля из объекта запроса', () => {
      assert.equal(oRequestHandler.moduleName, oRequestHandler.toUpperCaseFirstLetter(sModule));
    });
  });
});
