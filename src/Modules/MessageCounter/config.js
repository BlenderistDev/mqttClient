export default {
  type: 'List',
  name: 'MessageCounter',
  fields: {
    interval: {
      type: 'Number',
      name: 'interval',
      width: 8
    },
    socket: {
      type: 'Socket',
      name: 'socket',
      topic: 'MessageCounter',
      virtual: true,
      width: 2
    }
  }
}