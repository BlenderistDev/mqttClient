export default {
  type: 'Form',
  name: 'Mqtt',
  fields: {
    ping: {
      type: 'Socket',
      name: 'ping',
      topic: 'Ping',
    },
  }
}
