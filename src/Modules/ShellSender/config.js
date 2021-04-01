export default {
  type: 'List',
  name: 'ShellSender',
  fields: {
    command: {
      type: 'String',
      name: 'command'
    },
    topic: {
      type: 'String',
      name: 'topic'
    },
    interval: {
      type: 'Number',
      name: 'interval'
    },
  }
}