const path = require('path');
const ApiPrototype = require(path.join(process.env.WEB_DIR, 'ApiPrototype'));
const Subscriptions = require('./model/Subscriptions');

/**
 * Api для главного модуля
 */
class Api extends ApiPrototype {
  /**
   * Добавляем подписчика
   */
  cmdAddSubscriber() {
    const oSubscriberData = {
      'module': this.data.module,
      'topic': this.data.topic,
    };
    Subscriptions.create(oSubscriberData);
  }

  /**
   * Удаляем подписчика
   */
  cmdRemoveSubscriber() {
    const iSubscriberId = this.data.id;
    Subscriptions.removeByPk(iSubscriberId);
  }

  /**
   * Обновляем подписчика
   */
  cmdUpdateSubscriber() {

  }
}

module.exports = Api;
