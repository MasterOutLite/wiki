import models from 'db/models';
import USERS from 'constants/user';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.userRole.destroy({
      truncate: true,
      restartIdentity: true,
      force: true,
      hooks: false,
      cascade: true,
    });

    return queryInterface.bulkInsert(
      'userRoles',
      [
        {
          name: USERS.roles.admin.key,
          permissions: USERS.roles.admin.permissions,
        },
        {
          name: USERS.roles.member.key,
          permissions: USERS.roles.member.permissions,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('userRoles', null, {});
  },
};
