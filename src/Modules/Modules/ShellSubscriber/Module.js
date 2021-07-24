import { shellExec, execIfNotRoot } from '../../../Components/Shell.js';
import { mqttClient } from '../../../Components/SocketClient.js'
import { config } from "../../../Components/ModuleConfig.js";

const replaceLabels = (text, labels) => {
  for (const label in labels) {
    text = text.replace(`{{${label}}}`, labels[label]);
  }
  return text
}

const executeCommand = (command, labels) => shellExec(replaceLabels(command, labels))

const launchModule = () => {
  mqttClient.on('message', (message) => {
    if (config.topic === message.topic) {
      executeCommand(config.commandTemplate, JSON.parse(message.message))
    }
  })
}

execIfNotRoot(launchModule)