import { getModuleConfig } from '../Api/ModuleApi.js'
import _ from 'lodash'
import * as R from 'ramda'

const validators = {
  required: {
    validate: value => !R.isEmpty(value),
    message: field => `Field ${field} is required.`
  },
  positiveNumber: {
    validate: value => parseInt(value) > 0,
    message: (field, value) => `Field ${field} must be more than 0. ${value} given.`
  }
}

const validateField = (field, validator) => R.ifElse(
  validators[validator].validate,
  () => false,
  R.useWith(validators[validator].message, [R.identity, R.identity])(field.name)
)

const validateRow = (field, value) =>
  _.map(field.validator, validator => validateField(field, validator)(value)
)

const prepareConfig = config => R.pipe(
  R.andThen(R.prop('fields')),
  R.andThen(R.map(field => validateRow(field, config[field.name]))),
  R.andThen(R.reject(R.isEmpty)),
)

export const validate = (module, config) => prepareConfig(config)(getModuleConfig(module))
