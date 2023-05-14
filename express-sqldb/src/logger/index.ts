import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ level, message }) => `${level}: ${message}`),
  ),
  defaultMeta: {
    service: 'Express-PsqlDB',
  },
});

export default logger;
