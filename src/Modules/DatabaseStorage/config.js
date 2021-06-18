export default {
  type: 'Form',
  name: 'DatabaseStorage',
  fields: {
    host: {
      type: 'Input',
      name: 'host',
      validator: ['required']
    },
    user: {
      type: 'Input',
      name: 'user',
    },
    password: {
      type: 'Input',
      name: 'password',
    },
    database: {
      type: 'Input',
      name: 'database',
    },
    table: {
      type: 'Input',
      name: 'table',
    },
  }
}
