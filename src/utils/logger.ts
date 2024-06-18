import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
    base: {
        pid: false
    },
    timestamp: () => `,"time": "${dayjs().format()}"`
}, logger.transport({
    target: 'pino-pretty',
    options: {
        colorize: true
    }
}));

export default log;