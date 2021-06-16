import _ from 'lodash'

const storeToLocalStorage = state => {
  localStorage.setItem('store.messages', JSON.stringify({
    perPage: state.perPage,
    messageFilter: state.messageFilter,
    topicFilter: state.topicFilter,
  }))
}
export const initialiseStore = state => {
  if (localStorage.getItem('store.messages')) {
    const localConfig = JSON.parse(localStorage.getItem('store.messages'));
    state.perPage = localConfig.perPage;
    state.messageFilter = localConfig.messageFilter;
    state.topicFilter = localConfig.topicFilter;
  }
}

export const addMessage = (state, message) => {
  state.messages.unshift(message)
  if (_.isUndefined(state.groupedMessages[message.topic])) {
    state.groupedMessages[message.topic] = [];
  }
  state.groupedMessages[message.topic].unshift(message);
}

export const setMessageFilter = (state, message) => {
  state.messageFilter = message
  storeToLocalStorage(state)
}
export const setTopicFilter = (state, topic) => {
  state.topicFilter = topic
  storeToLocalStorage(state)
}
export const setPerPage = (state, perPage) => {
  state.perPage = perPage
  storeToLocalStorage(state)
}
