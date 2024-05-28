'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Events', 'status', {
      type: Sequelize.ENUM,
      values: ['draft', 'published'],
      allowNull: false,
      defaultValue: 'draft',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Events', 'status');
  },
};
