export default {
  type: 'List',
  name: 'ShellSender',
  title: 'Shell Sender',
  fields: {
    command: {
      type: 'Input',
      name: 'command',
      width: 4,
      validator: ['required']
    },
    topic: {
      type: 'Input',
      name: 'topic',
      width: 4,
      validator: ['required']
    },
    interval: {
      type: 'Number',
      name: 'interval',
      width: 2,
      validator: ['required', 'positiveNumber']
    },
  }
}
