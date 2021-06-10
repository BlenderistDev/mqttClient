import _ from 'lodash'

export const addMessage = (state, message) => {
  state.messages.unshift(message)
  if (_.isUndefined(state.groupedMessages[message.topic])) {
    state.groupedMessages[message.topic] = [];
  }
  state.groupedMessages[message.topic].unshift(message);
}

export const setMessageFilter = (state, message) => state.messageFilter = message
export const setTopicFilter = (state, topic) => state.topicFilter = topic
export const setPerPage = (state, perPage) => state.perPage = perPage
