import {SubscriberPrototype} from '../../core/ModuleManager/SubscriberPrototype.js';

/**
 * mqtt Подписчик для замера пинга
 */
export class Subscriber extends SubscriberPrototype {
  /**
   * @param {string} sTopic
   * @param {string} sMessage
   */
  handleMessage(sTopic, sMessage) {
    const oMessage = JSON.parse(sMessage);
    const iPing = (Date.now() - JSON.parse(sMessage).timestamp)/1000;
    this.sendMessage(oMessage.result_topic, iPing.toString())
  }

  isTopicInSubscription(sTopic) {
    return sTopic === '/mqtt/ping/measure';
  }
}
