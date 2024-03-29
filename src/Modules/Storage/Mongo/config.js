export default {
  type: 'Form',
  name: 'Mongo',
  fields: {
    host: {
      type: 'Input',
      name: 'host',
      validator: ['required'],
      width: 4,
      placeholder: '127.0.0.1',
    },
    user: {
      type: 'Input',
      name: 'user',
      width: 4
    },
    password: {
      type: 'Password',
      name: 'password',
      width: 4
    },
    database: {
      type: 'Input',
      name: 'database',
      validator: ['required'],
      width: 4
    },
    collection: {
      type: 'Input',
      name: 'collection',
      validator: ['required'],
      width: 4,
    },
    interval: {
      type: 'Number',
      name: 'interval',
      width: 4
    }
  }
}
