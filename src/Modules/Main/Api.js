import {ApiPrototype} from '../../core/index.js';
import { getManager } from '../../core/index.js'
import _ from 'lodash'


export class Api extends ApiPrototype {
  cmdModuleList () {
    return getManager().aModules
    return _.filter(getManager().aModules, module => !_.isUndefined(module.api))
  }
}

