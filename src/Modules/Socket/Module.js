process.on('message', (mqttMessage) => {
  const now = new Date()
  mqttMessage.date = now.toLocaleString('en-US', { hour12: false } )
  process.send({
    topic: 'mqtt',
    message: mqttMessage
  })
});
