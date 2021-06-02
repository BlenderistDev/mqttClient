export default {
  type: 'List',
  name: 'ShellSender',
  fields: {
    command: {
      type: 'Input',
      name: 'command',
      width: 4
    },
    topic: {
      type: 'Input',
      name: 'topic',
      width: 4
    },
    interval: {
      type: 'Number',
      name: 'interval',
      width: 2,
      validator: ['required', 'positiveNumber']
    },
  }
}
