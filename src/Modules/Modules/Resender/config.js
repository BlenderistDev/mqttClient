export default {
  type: 'List',
  name: 'Resender',
  fields: {
    direction: {
      type: 'Select',
      name: 'direction',
      options: ['from', 'to'],
      width: 2,
      validator: ['required']
    },
    host: {
      type: 'Input',
      name: 'host',
      width: 3,
      placeholder: 'mqtt://127.0.0.1',
      validator: ['required', 'hasProtocol']
    },
    username: {
      type: 'Input',
      name: 'username',
      width: 3
    },
    password: {
      type: 'Password',
      name: 'password',
      width: 2
    },
    topic: {
      type: 'Input',
      name: 'topic',
      width: 2,
      validator: ['required']
    },
  }
}
