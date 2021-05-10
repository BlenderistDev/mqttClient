import _ from 'lodash'

export const addMessage = (state, message) => {
  state.messages.unshift(message)
  if (_.isUndefined(state.groupedMessages[message.topic])) {
    state.groupedMessages[message.topic] = [];
  }
  state.groupedMessages[message.topic].unshift(message);
}