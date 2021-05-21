export const messagesCount = (state) => state.messages.length
export const topicCount = (state) => Object.keys(state.groupedMessages).length
