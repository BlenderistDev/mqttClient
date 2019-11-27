const ModelPrototype = require('../../../database/ModelPrototype');

/**
 * Модель для подписок
 */
class Subscibe extends ModelPrototype {
  /**
   * Конструктор модели
   */
  constructor() {
    super();
  }

  /**
   * @return {array}
   */
  static get Fields() {
    return [
      {
        name: 'id',
        type: 'int',
        required: false,
        primary: true,
      },
      {
        name: 'topic',
        type: 'string',
        required: true,
      },
      {
        name: 'module',
        type: 'string',
        required: true,
      },
    ];
  }

  /**
   * @return {string}
   */
  static get tableName() {
    return 'subscribes';
  }
}

module.exports = Subscibe;
