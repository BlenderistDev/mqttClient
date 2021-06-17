import _ from "lodash";

const stringIncludes = (string, substring) => _.isEmpty(substring) || string.includes(substring);

export const filterMessages = state => _.filter(state.messages,
  (message) => stringIncludes(message.topic, state.topicFilter)
    && stringIncludes(message.message, state.messageFilter)
)

export const filterMessagesCount = (state, getters) => getters.filterMessages.length

export const groupedMessages = state => _
  .chain(state.messages)
  .sortBy('topic')
  .groupBy('topic')
  .value()

export const filterGroupedMessages = (state, getters) => _
  .chain(getters.groupedMessages)
  .pickBy((messages, topic) => stringIncludes(topic, state.topicFilter))
  .mapValues(messages => _.filter(messages, message => stringIncludes(message.message, state.messageFilter)))
  .omitBy(_.isEmpty)
  .value()

export const filterGroupedMessagesCount = (state, getters) => Object.keys(getters.filterGroupedMessages).length
