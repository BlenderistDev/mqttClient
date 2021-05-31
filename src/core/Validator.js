import { getModuleConfig } from '../Api/ModuleApi.js'
import _ from 'lodash'
import * as R from 'ramda'

const validators = {
  required: {
    validate: value => !_.isEmpty(value),
    message: field => `Field ${field} is required.`
  },
  positiveNumber: {
    validate: value => parseInt(value) > 0,
    message: (field, value) => `Field ${field} must be more than 0. ${value} given.`
  }
}

export const validate = (module, config) => {
  return getModuleConfig(module).then(moduleConfig => _
    .chain(moduleConfig.fields)
    .map(field => validateRow(field, config[field.name]))
    .flatMap()
    .filter(error => !_.isEmpty(error))
    .value()
  )
}

const validateField = (field, validator) => R.ifElse(
  validators[validator].validate,
  () => false,
  R.useWith(validators[validator].message, [R.identity, R.identity])(field.name)
)

const validateRow = (field, value) => _.map(field.validator,
  validator => validateField(field, validator)(value)
)
