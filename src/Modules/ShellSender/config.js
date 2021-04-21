export default {
  type: 'List',
  name: 'ShellSender',
  fields: {
    command: {
      type: 'Input',
      name: 'command'
    },
    topic: {
      type: 'Input',
      name: 'topic'
    },
    interval: {
      type: 'Number',
      name: 'interval'
    },
  }
}
