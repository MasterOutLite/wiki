import Cron from 'node-schedule';
import CronService from 'services/CronService';
import logger, {manualLogger, LOGGER} from 'services/logger';

const cronLogger = manualLogger(LOGGER.loggerNames.cron);

export default async () => {
  logger.info('Cron started');

  // Example cron job
  Cron.scheduleJob('*/1 * * * *', async () => {
    cronLogger.info('CRON JOB: Example - START');
    try {
      await CronService.testAction();
    } catch (error) {
      cronLogger.info(error.message);
    }
    cronLogger.info('CRON JOB: Example - END');
  });
};
