const {createLogger, format, transports} = require('winston');
const {combine, timestamp, printf} = format;
const myFormat = printf(({message, timestamp}) => {
  return `${timestamp}: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({filename: 'log/error.log'}),
  ],
});
module.exports = logger;
