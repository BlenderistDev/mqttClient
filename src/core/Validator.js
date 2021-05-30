import { getModuleConfig } from '../Api/ModuleApi.js'
import _ from 'lodash'
import * as R from 'ramda'

const validators = {
  required: value => !_.isEmpty(value),
  positiveNumber: value => parseInt(value) > 0
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

const setFieldError = (field, validator) => () => R.set(R.lensProp(field.name), validator, {})
const validateField = (field, validator) => R.ifElse(validators[validator], () => false, setFieldError(field, validator))
const validateRow = (field, value) => _.map(field.validator,
  validator => validateField(field, validator)(value)
)

