import {getModuleConfig} from "./ModuleConfig.js";
import * as R from 'ramda'

export const getMessages = (filter, limit) => {
  return getModuleConfig('Storage', 'Storage').then(R.pipe(
    R.prop('value'),
    R.prop('storage'),
    storage => {
      return import(`../Modules/Storage/${storage}/Storage.js`)
    },
    R.andThen(module => module.get(filter, limit))
  ))
}
