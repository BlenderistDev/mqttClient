export default {
  type: 'Form',
  name: 'Database',
  fields: {
    dialect: {
      type: 'Select',
      name: 'dialect',
      options: ['mysql', 'postgres', 'mariadb'],
      width: 2,
      validator: ['required'],
    },
    host: {
      type: 'Input',
      name: 'host',
      validator: ['required'],
      width: 3,
      placeholder: '127.0.0.1',
    },
    user: {
      type: 'Input',
      name: 'user',
      width: 3
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
    interval: {
      type: 'Number',
      name: 'interval',
      width: 2
    }
  }
}
