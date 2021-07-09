export default {
  type: 'Form',
  name: 'Ping',
  fields: {
    interval: {
      type: 'Number',
      name: 'interval',
      validator: ['required', 'positiveNumber']
    },
    ping: {
      type: 'Socket',
      name: 'ping',
      topic: 'Ping',
      virtual: true
    },
  }
}
