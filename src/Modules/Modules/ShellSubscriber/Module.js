import { shellExec, execIfNotRoot } from '../../../Components/Shell.js';
import { mqttClient } from '../../../Components/SocketClient.js'
import { config } from "../../../Components/ModuleConfig.js";

const replaceLabels = (text, labels) => {
  for (const label in labels) {
    text = text.replace(`{{${label}}}`, labels[label]);
  }
  return text
}

const launchModule = () => {
  mqttClient.on('message', (message) => {
    if (config.topic === message.topic) {
      if (message.message) {
        shellExec(replaceLabels(config.command, JSON.parse(message.message)))
      } else {
        shellExec(config.command)
      }
    }
  })
}

execIfNotRoot(launchModule)