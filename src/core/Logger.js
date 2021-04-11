import winston from 'winston'

const { createLogger, format, transports}  = winston
const { combine, timestamp, printf } = format
const myFormat = printf(({ message, timestamp }) => `${timestamp}: ${message}`)

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.File({ filename: 'log/error.log' }),
  ],
});

export { logger }
