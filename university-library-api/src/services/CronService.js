import {manualLogger, LOGGER} from 'services/logger';

const logger = manualLogger(LOGGER.loggerNames.cron);

class CronService {
  async testAction() {
    logger.info('testAction - OK');

    return true;
  }
}

export default new CronService();
