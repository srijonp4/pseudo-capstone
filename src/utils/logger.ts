import pino from 'pino';
import pretty from 'pino-pretty';
import dayjs from 'dayjs';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      // ignore: 'pid',
    },
  },
});

export default logger;
