require('../../../config/constants');

const assert = require('assert');
const ApiPrototype = require('../../../src/core/Api/ApiPrototype');

describe('ApiPrototype', () => {
  context('get data()', () => {
    it('проверяем корректную передачу объекта data с данными запроса', () => {
      const aTestData = {
        test1: 1,
        test2: 'test',
      };
      const oApiPrototype = new ApiPrototype({
        body: {
          data: aTestData,
        },
      });
      assert.deepEqual(aTestData, oApiPrototype.data);
    });
  });
});
