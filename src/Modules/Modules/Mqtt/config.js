export default {
  type: 'Form',
  name: 'Mqtt',
  fields: {
    host: {
      type: 'Input',
      name: 'host',
      width: 4,
      placeholder: 'mqtt://127.0.0.1',
      validator: ['required', 'hasProtocol']
    },
    username: {
      type: 'Input',
      name: 'username',
      width: 4
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
      tooltip: 'Mqtt client base topic'
    },
  }
}
