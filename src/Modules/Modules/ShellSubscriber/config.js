export default {
  type: 'List',
  name: 'ShellSubscriber',
  fields: {
    topic: {
      type: 'Input',
      name: 'topic',
      width: 5,
      validator: ['required']
    },
    command: {
      type: 'Input',
      name: 'command',
      width: 5,
      validator: ['required']
    },
  }
}
