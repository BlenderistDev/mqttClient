import shell from 'shelljs'

export const shellExec = command => shell.exec(command, {'silent': true}).toString()