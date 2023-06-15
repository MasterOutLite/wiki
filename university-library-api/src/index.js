import server from './server';
import cron from './cron';

const init = async () => {
  // Initialize Server
  await server();
  // Initialize Cron
  await cron();
};

init();
