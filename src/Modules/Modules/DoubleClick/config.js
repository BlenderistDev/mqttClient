export default {
  type: 'List',
  name: 'DoubleClick',
  fields: {
    interval: {
      type: 'Number',
      name: 'interval',
      width: 1,
      validator: ['required', 'positiveNumber']
    },
    in_topic: {
      type: 'Input',
      name: 'in_topic',
      width: 5,
      validator: ['required']
    },
    attribute: {
      type: 'Input',
      name: 'attribute',
      width: 3
    },
    name: {
      type: 'Input',
      name: 'name',
      width: 3
    },
  }
}
