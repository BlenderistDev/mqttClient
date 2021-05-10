import _ from 'lodash'

export const getConfigRow = (state) => (id) => {
  return _.find(state.module.value, {id: id})
}