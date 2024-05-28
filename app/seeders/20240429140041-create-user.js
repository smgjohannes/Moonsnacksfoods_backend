const uuid = require('uuid');
const passwordUtils = require('../utils/password');

('use strict');

module.exports = {
  async up(queryInterface, Sequelize) {
    const adminPasswordHash = await passwordUtils.hash(
      'hwq7P@C;9m[#xS)-N6rV%W'
    );
    const superadminPasswordHash = await passwordUtils.hash(
      'GFtc,+4[XJu=CVj";?9sL'
    );

    return await queryInterface.bulkInsert(
      'users',
      [
        {
          id: uuid.v4(),
          name: 'Bruno',
          email: 'admin@moonsnacksfoods.com',
          role: 'admin',
          password: adminPasswordHash,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuid.v4(),
          name: 'Developer',
          email: 'developer@mindsinaction.com.na',
          role: 'superadmin',
          password: superadminPasswordHash,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('users', null, {});
  },
};
