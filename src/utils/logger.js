const { createLogger, format, transports } = require('winston');
const { combine, timestamp, splat } = format;

const logger = createLogger({
  level: process.env.LOGLEVEL || "info",
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    splat(),  // this allows objects to be printed nicely
    format.printf(info => {
      return `${info.timestamp} ${info.level}: ${info.message}`;
    })
  ),
  transports: [new transports.Console()] // Currently setting this to console, can add File transports later
})

module.exports = logger
