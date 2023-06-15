import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import winston from 'winston';
import expressWinston from 'express-winston';
import CONFIG from 'constants/config';

export default app => {
  // Helmet helps you secure your Express apps by setting various HTTP headers
  app.use(helmet());

  app.use(cors());
  app.use(bodyParser.json({limit: '50mb', extended: true}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.use(cookieParser());

  if (!CONFIG.envs.production) {
    app.use(
      expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json(),
          winston.format.printf(info => info.message)
        ),
        msg: 'HTTP {{req.method}} {{req.url}}',
        expressFormat: true,
        colorize: true,
      })
    );
  }
};
