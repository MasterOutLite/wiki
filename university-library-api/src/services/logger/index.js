import {createLogger, format, transports} from 'winston';
import 'colors';
import _ from 'lodash';

import CONFIG from 'constants/config';
import LOGGER from 'services/logger/constants';
import helpers from 'helpers';

const instances = {};
const {combine, timestamp, json, printf} = format;
const logger = createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 4,
    cron: 5,
  },
});
const prettyJSON = value =>
  value
    .replace(/[("{|}")]/gi, '')
    .replace(/,\n/g, '\n')
    .replace(/\n+/g, '\n')
    .replace(/ +\n$/g, '')
    .replace(/\n$/g, '')
    .replace(/: \[\n/g, ': [')
    .replace(/\n +\n/g, '\n');

if (!CONFIG.envs.production) {
  logger.add(
    new transports.Console({
      level: 'debug',
      format: combine(
        printf(info => {
          const {level, message} = info;
          let body = '';
          if (level === 'error') {
            body = prettyJSON(JSON.stringify(_.omit(info, ['level']), null, 2));
          } else {
            body = helpers.isString(message) ? message : prettyJSON(JSON.stringify(message, null, 2));
          }
          body = `${level === 'info' ? '' : `${level.toLocaleUpperCase()} `}${body}`;

          switch (level) {
            case 'error':
              return body.red;
            case 'warn':
              return body.yellow;
            case 'info':
              return body.blue;
            case 'debug':
              return body.green;
            default:
              return body;
          }
        })
      ),
    })
  );
}

if (!CONFIG.envs.development) {
  logger.add(
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: combine(json(), timestamp()),
    })
  );
}

const manualLogger = name => {
  if (!instances[name]) {
    instances[name] = createLogger({
      levels: {
        error: 0,
        warn: 1,
        info: 2,
      },
      transports: [
        ...(!CONFIG.envs.production
          ? [
              new transports.Console({
                level: 'info',
                format: combine(
                  printf(info => {
                    const {message} = info;
                    let body = `${name.toUpperCase()}: `;
                    body += helpers.isString(message) ? message : prettyJSON(JSON.stringify(message, null, 2));

                    return body.green;
                  })
                ),
              }),
            ]
          : []),
        ...(!CONFIG.envs.development
          ? [
              new transports.File({
                filename: `logs/${name}.log`,
                level: 'info',
                format: combine(json(), timestamp()),
              }),
            ]
          : []),
      ],
    });
  }

  return instances[name];
};

export default logger;
export {LOGGER, manualLogger};

// Example
// logger.log('silly', "127.0.0.1 - there's no place like home");
// logger.log('debug', "127.0.0.1 - there's no place like home");
// logger.log('verbose', "127.0.0.1 - there's no place like home");
// logger.log('info', "127.0.0.1 - there's no place like home");
// logger.log('warn', "127.0.0.1 - there's no place like home");
// logger.log('error', "127.0.0.1 - there's no place like home");
// logger.info("127.0.0.1 - there's no place like home");
// logger.warn("127.0.0.1 - there's no place like home");
// logger.error("127.0.0.1 - there's no place like home");
