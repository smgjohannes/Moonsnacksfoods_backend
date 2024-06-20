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
    const userPasswordHash = await passwordUtils.hash(
      'Otjomuise_ebcsalom@2024'
    );
    console.log('adminPasswordHash:', adminPasswordHash);
    console.log('superadminPasswordHash:', superadminPasswordHash);
    console.log('userPasswordHash:', userPasswordHash);
    return await queryInterface.bulkInsert(
      'users',
      [
        {
          id: uuid.v4(),
          name: 'Matthew Samba',
          email: 'admin@moonsnacksfoods.com',
          role: 'admin',
          password: adminPasswordHash,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuid.v4(),
          name: 'Domingo Johannes',
          email: 'johannes@gmail.com.com.na',
          role: 'superadmin',
          password: superadminPasswordHash,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuid.v4(),
          name: 'Salom',
          email: 'salom@gmail.com',
          role: 'user',
          password: userPasswordHash,
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
