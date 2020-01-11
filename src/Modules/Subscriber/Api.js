const path = require('path');
const ApiPrototype = require(path.join(process.env.WEB_DIR, 'ApiPrototype'));
const Subscriptions = require('./model/Subscriptions');

/**
 * Api для подписчиков
 */
class Api extends ApiPrototype {
  /**
   * Добавляем подписчика
   */
  cmdAdd() {
    const oSubscriberData = {
      'module': this.data.module,
      'topic': this.data.topic,
    };
    Subscriptions.create(oSubscriberData);
  }

  /**
   * Удаляем подписчика
   */
  cmdRemove() {
    const iSubscriberId = this.data.id;
    Subscriptions.removeByPk(iSubscriberId);
  }

  /**
   * Обновляем подписчика
   */
  cmdUpdate() {

  }
}

module.exports = Api;
