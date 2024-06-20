'use strict';

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('members', 'status', {
      type: Sequelize.ENUM,
      values: ['inactive', 'active'],
      defaultValue: 'active',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('members', 'status');
  },
};
