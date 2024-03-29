import { getMessages } from '../../services/api'

export const setDateFilter = ({ state, commit }, dateFilter) => {
  commit('setDateFilter', dateFilter)
  const filter = {
    before: dateFilter.before,
    after: dateFilter.after,
    topic: state.topicFilter,
    message: state.messageFilter
  }
  const limit = {
    limit: state.bufferSize,
    skip: 0
  }
  getMessages(filter, limit).then(messages => {
    commit('setMessages', messages)
  })
}
