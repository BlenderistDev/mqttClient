import {ApiPrototype} from '../../core/index.js';
import { getManager } from '../../core/index.js'

export class Api extends ApiPrototype {
  cmdModuleList () {
    return getManager().aModules
  }
}

