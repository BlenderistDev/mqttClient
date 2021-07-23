import shell from 'shelljs'
import { notificationClient } from "./SocketClient.js";
import { name } from "./ModuleConfig.js";

export const shellExec = command => shell.exec(command, {'silent': true}).toString().trim()

export const execIfNotRoot = func => {
  if (shellExec("whoami") === 'root') {
    notificationClient.send({
      module: name,
      message: "Root user is forbidden"
    })
  } else {
    func()
  }
}
