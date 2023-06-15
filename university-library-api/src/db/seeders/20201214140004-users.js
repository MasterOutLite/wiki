import {faker} from '@faker-js/faker';
import {saltHashPassword} from 'helpers/crypto';
import USER from 'constants/user';

module.exports = {
  async up(queryInterface, Sequelize) {
    const {salt, passwordHash} = await saltHashPassword('111111');
    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'admin@admin.com',
          password: passwordHash,
          salt,
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          userRoleId: USER.roles.admin.id,
        },
        {
          email: faker.internet.email(),
          password: passwordHash,
          salt,
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          userRoleId: USER.roles.member.id,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
