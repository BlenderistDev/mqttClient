export default {
  type: 'List',
  name: 'MessageCounter',
  title: 'Message Counter',
  fields: {
    interval: {
      type: 'Number',
      name: 'interval',
      width: 3,
      validator: ['required', 'positiveNumber']
    },
    topic: {
      type: 'Input',
      name: 'topic',
      width: 3,
      tooltip: 'Topic to count messages. Default is #'
    },
    ignoreRetain: {
      type: 'Select',
      name: 'ignoreRetain',
      options: ['smart', 'false', 'true'],
      width: 2,
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
