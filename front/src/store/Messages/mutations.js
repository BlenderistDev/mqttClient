const storeToLocalStorage = state => {
  localStorage.setItem('store.messages', JSON.stringify({
    perPage: state.perPage,
    messageFilter: state.messageFilter,
    topicFilter: state.topicFilter,
    bufferSize: state.bufferSize,
  }))
}
export const initialiseStore = state => {
  if (localStorage.getItem('store.messages')) {
    const localConfig = JSON.parse(localStorage.getItem('store.messages'));
    state.perPage = localConfig.perPage;
    state.messageFilter = localConfig.messageFilter;
    state.topicFilter = localConfig.topicFilter;
    state.bufferSize = localConfig.bufferSize;
  }
}

export const addMessage = (state, message) => {
  state.messages.unshift(message)
  while(state.messages.length > state.bufferSize) {
    state.messages.pop()
  }
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
export const setBufferSize = (state, bufferSize) => {
  state.bufferSize = bufferSize
  storeToLocalStorage(state)
}

export const setDateFilter = (state, dateFilter) => state.dateFilter = dateFilter
export const setMessages = (state, messages) => state.messages = messages

export const setCurrentMessage = (state, message) => state.currentMessage = message
