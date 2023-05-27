import { createLogger, transports, format } from 'winston';

const formatTime = (tieInMilliSecs: Date) => `${tieInMilliSecs.getFullYear()}\
/${tieInMilliSecs.getMonth() + 1}/${tieInMilliSecs.getDate()} -\
 ${tieInMilliSecs.getHours()}:${tieInMilliSecs.getMinutes()}\
:${tieInMilliSecs.getSeconds()}`;

const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => {
      const formatedTime = formatTime(new Date(timestamp));
      return `[${formatedTime}] : ${level}: ${message}`;
    }),
  ),
  defaultMeta: {
    service: 'Express-PsqlDB',
  },
});

export default logger;
