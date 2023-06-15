import path from 'path';
import _merge from 'lodash/merge';

import packageJSON from '../../package.json';

// Default configurations applied to all environments
const defaultConfig = {
  env: process.env.NODE_ENV,
  get envs() {
    return {
      stage: process.env.NODE_ENV === 'stage',
      development: process.env.NODE_ENV === 'development',
      production: process.env.NODE_ENV === 'production',
    };
  },

  version: packageJSON.version,
  root: path.normalize(`${__dirname}/../..`),
  port: process.env.PORT || 3030,
  ip: process.env.IP || '0.0.0.0',
  apiPrefix: '/', // Could be /api/resource or /api/v2/resource
  jwt: {
    maxRefreshSessionCount: process.env.MAX_REFRESH_SESSIONS_COUNT || 5,
    tokenSecret: process.env.TOKEN_SECRET,
    tokens: {
      access: {
        type: 'access',
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '30d',
      },
      refresh: {
        type: 'refresh',
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '60d',
      },
    },
  },
  cron: {},
  clientSecret: process.env.CLIENT_SECRET,
  databaseUrl: process.env.DATABASE_URL,
};

// Environment specific overrides
const environmentConfigs = {
  development: {},
  test: {
    port: process.env.PORT || 3000,
  },
  production: {},
};

// Recursively merge configurations
export default _merge(defaultConfig, environmentConfigs[process.env.NODE_ENV] || {});
