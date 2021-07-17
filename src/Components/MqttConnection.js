import * as R from 'ramda'

export const getConnectionOptions = R.pipe(
  R.pick(['username', 'password']),
  R.reject(R.either(R.isEmpty, R.isNil))
)