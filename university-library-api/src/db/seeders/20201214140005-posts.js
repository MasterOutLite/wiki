import {faker} from '@faker-js/faker';
import helpers from 'helpers';

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query('SELECT id from users');
    const userRows = users[0];

    await queryInterface.bulkInsert(
      'posts',
      Array.from({length: 10}, () => ({
        name: faker.lorem.sentence({min: 1, max: 3}).replace('.', ''),
        description: faker.lorem.paragraphs({min: 3, max: 5}, '<br/>\n'),
        userId: helpers.random.fromArray(userRows).id,
      })),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
  },
};
