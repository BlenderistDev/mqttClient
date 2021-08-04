export default {
  type: 'List',
  name: 'MessageCounter',
  title: 'Message Counter',
  fields: {
    interval: {
      type: 'Number',
      name: 'interval',
      width: 8,
      validator: ['required', 'positiveNumber']
    },
    socket: {
      type: 'SocketList',
      name: 'socket',
      topic: 'MessageCounter',
      virtual: true,
      width: 2
    }
  }
}
