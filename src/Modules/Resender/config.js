export default {
  type: 'List',
  name: 'Resender',
  fields: {
    direction: {
      type: 'Select',
      name: 'direction',
      options: ['from', 'to'],
      width: 2
    },
    host: {
      type: 'Input',
      name: 'host',
      width: 3
    },
    username: {
      type: 'Input',
      name: 'username',
      width: 3
    },
    password: {
      type: 'Input',
      name: 'password',
      width: 2
    },
    topic: {
      type: 'Input',
      name: 'topic',
      width: 2
    },
  }
}
