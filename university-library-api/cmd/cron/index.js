import helpers from 'helpers';
import CronService from 'services/CronService';
import {manualLogger, LOGGER} from 'services/logger';

const cronLogger = manualLogger(LOGGER.loggerNames.cron);

// yarn run cron:run exampleCronAction
const exec = async methodName => {
  const method = CronService[methodName];
  if (method) {
    try {
      cronLogger.info(`Run ${methodName} method`);
      await method();
    } catch (error) {
      cronLogger.error(error);
    }
  }
};

helpers.runCmd(async () => {
  const args = process.argv;

  if (helpers.isEmpty(args[3])) cronLogger.info('Need to select cron method');

  await exec(args[3]);
});
