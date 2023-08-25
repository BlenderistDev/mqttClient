import { state } from './state'
import * as getters from '../Modules/getters'
import * as mutations from './mutations'
import * as actions from '../Modules/actions'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

