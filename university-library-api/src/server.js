import express from 'express';

import CONFIG from 'constants/config';
import errorHandler from 'middlewares/error-handler';
import middlewares from 'middlewares';
import routes from 'routes';
import logger from 'services/logger';

const app = express();

// Set middlewares
middlewares(app);

// Static files
app.use('/public', express.static('src/public'));

// View
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

// Mount API routes
app.use(CONFIG.apiPrefix, routes);

// Set error handler. Should be called after routes
errorHandler(app);

export default async () => {
  await new Promise(resolve => {
    app.listen(CONFIG.port, resolve);
  });

  logger.info(`Server started
    Port: ${CONFIG.port}
    Env: ${app.get('env')}
  `);
};
