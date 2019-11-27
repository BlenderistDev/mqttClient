const dbClient = require('./DatabaseClient');

/**
 * Прототип модели
 */
class ModelProtorype {
  /**
   * @return {object}
   */
  static get db() {
    return dbClient;
  }

  /**
   * Конструктор модели
   */
  constructor() {
    this.attrubutes = {};
    this.Fields.forEach((oField) => {
      this.attrubutes[oField.name] = null;
    });
  }

  /**
   * ляет данные в атрибуты модели
   * @param {object} oData
   */
  setData(oData) {
    this.Fields.forEach((oField) => {
      if (typeof( oData[oField.name] ) != 'undefined' && oData[oField.name] !== null) {
        this.attrubutes[oField.name] = oData[oField.name];
      } else if (oField.required == true) {
        throw new Error(`undefined value for field ${oField.name}`);
      }
    });
  }

  /**
   * @return {promise}
   */
  save() {
    return this.db(this.tableName).insert(this.attrubutes).then(() => {
      return true;
    });
  }

  /**
   * Геттер для полей модули
   */
  static get Fields() {
    throw new Error('model fields are not declared');
  }

  /**
   *  для имени таблицы модели
   */
  static get tableName() {
    throw new Error('undefuned table name');
  }

  /**
   * Производит поиск по таблицы и возвращает промис с результатом
   * @param {object} oCondition
   * @return {promise}
   */
  static find(oCondition = {}) {
    return this.db(this.tableName).where(oCondition).select('*').then((result) => {
      return JSON.parse(JSON.stringify(result));
    });
  }
}

module.exports = ModelProtorype;
