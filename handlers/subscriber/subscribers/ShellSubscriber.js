const shell = require('shelljs');

/**
 * mqtt Подписчик для выполнения ырудд команд
 */
class ShellSubscriber {
  /**
   * @param {object} oMessage
   */
  handleMessage(oMessage) {
    const sCmd = oMessage.cmd;
    const iValue = oMessage.value;
    let sCommand = `amixer -D pulse sset Master ${iValue}%`;
    switch (sCmd) {
      case 'increase':
        sCommand += '+';
        break;
      case 'decrease':
        sCommand += '-';
        break;
      case 'set':
        break;
      default:
        return;
    }
    shell.exec(sCommand);
  }
}

module.exports = new ShellSubscriber();
