export default {
  type: 'List',
  name: 'DoubleClick',
  title: 'Double Click',
  fields: {
    interval: {
      type: 'Number',
      name: 'interval',
      width: 2,
      validator: ['required', 'positiveNumber']
    },
    in_topic: {
      type: 'Input',
      name: 'in_topic',
      width: 4,
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
