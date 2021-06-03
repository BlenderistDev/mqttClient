import _ from 'lodash'

export const addNotification = (state, notification) => state.notifications.push(notification)
export const deleteNotification = (state, index) => {
  state.notifications = _.remove(state.notifications, (value, key) => key !== index)
}