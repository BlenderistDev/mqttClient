import { getMessages } from '../../services/api'

export const setBefore = ({ state, commit }, before) => {
  commit('setBefore', before)
  const filter = {
    before: before
  }
  const limit = {
    limit: state.bufferSize,
    skip: 0
  }
  getMessages(filter, limit).then(messages => commit('setMessages', messages))
}