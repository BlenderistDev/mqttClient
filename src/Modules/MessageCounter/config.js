export default {
  type: 'List',
  name: 'MessageCounter',
  fields: {
    interval: {
      type: 'Number',
      name: 'interval'
    },
    socket: {
      type: 'Socket',
      name: 'socket',
      topic: 'MessageCounter',
      virtual: true
    }
  }
}