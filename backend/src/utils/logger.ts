import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(({ level, timestamp, message }) => {
      return `${[level]}: ${message} | time: ${[timestamp]}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

export default logger;