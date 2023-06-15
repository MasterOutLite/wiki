import {Error as SequelizeError} from 'sequelize';
import CONFIG from 'constants/config';
import helpers from 'helpers';
import logger from 'services/logger';

export default app => {
  // catch 404 and forward to error handler
  app.use((request, response, next) => {
    next(new helpers.errors.NotFound());
  });

  // error handler
  app.use((error, request, response, next) => {
    error = {
      message: error.message,
      stack: error.stack,
      statusCode: error.statusCode || 500,
      errors: error.errors,
      errorType: error.errorType,
    };
    logger.error(error);

    const hideError = error instanceof SequelizeError || (error.stack && error.stack.indexOf('sequelize') >= 0);
    const data = {
      message: (!hideError && error.message) || 'Internal Server Error',
    };

    if (!hideError && !CONFIG.envs.production) {
      data.stack = error.stack;
    }

    if (!hideError && error.errors) {
      data.errors = {};
      const {errors} = error;
      for (const type in errors) {
        if (type in errors) {
          data.errors[type] = errors[type].message;
        }
      }
    }

    response.status((!hideError && error.statusCode) || 500).json(data);
  });
};
