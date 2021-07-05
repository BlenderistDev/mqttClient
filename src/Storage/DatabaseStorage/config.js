export default {
  type: 'List',
  name: 'DatabaseStorage',
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
    table: {
      type: 'Input',
      name: 'table',
      validator: ['required'],
      width: 4,
    },
  }
}
