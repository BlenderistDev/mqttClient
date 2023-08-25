export default {
  type: 'List',
  name: 'MessageCounter',
  title: 'Message Counter',
  fields: {
    interval: {
      type: 'Number',
      name: 'interval',
      width: 4,
      validator: ['required', 'positiveNumber']
    },
    ignoreRetain: {
      type: 'Select',
      name: 'ignoreRetain',
      options: ['smart', 'false', 'true'],
      width: 4,
      validator: ['required']
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
