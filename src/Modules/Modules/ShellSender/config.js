export default {
  type: 'List',
  name: 'ShellSender',
  title: 'Shell Sender',
  fields: {
    name: {
      type: 'Input',
      name: 'name',
      width: 2,
      validator: ['required']
    },
    command: {
      type: 'Input',
      name: 'command',
      width: 3,
      validator: ['required']
    },
    topic: {
      type: 'Input',
      name: 'topic',
      width: 3,
      validator: ['required']
    },
    interval: {
      type: 'Number',
      name: 'interval',
      width: 1,
      validator: ['required', 'positiveNumber']
    },
  }
}
