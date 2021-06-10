import _ from "lodash";

export const topicCount = state => Object.keys(state.groupedMessages).length

const stringIncludes = (string, substring) => _.isEmpty(substring) || string.includes(substring);

export const filterMessages = state => _.filter(state.messages,
  (message) => stringIncludes(message.topic, state.topicFilter)
    && stringIncludes(message.message, state.messageFilter)
)

export const filterMessagesCount = (state, getters) => getters.filterMessages.length
