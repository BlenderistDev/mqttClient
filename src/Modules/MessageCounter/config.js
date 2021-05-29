export default {
  type: 'List',
  name: 'MessageCounter',
  fields: {
    interval: {
      type: 'Number',
      name: 'interval',
      width: 8,
      validator: 'required'
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