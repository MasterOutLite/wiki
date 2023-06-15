import models from 'db/models';
import helpers from 'helpers';

helpers.runCmd(async () => {
  return await models.sequelize.drop();
});
