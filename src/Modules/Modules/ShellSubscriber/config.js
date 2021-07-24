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
    commandTemplate: {
      type: 'Input',
      name: 'commandTemplate',
      width: 5,
      validator: ['required']
    },
  }
}
