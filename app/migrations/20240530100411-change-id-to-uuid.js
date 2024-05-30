'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add a new column for UUID
    // await queryInterface.addColumn('Events', 'uuid', {
    //   type: Sequelize.UUID,
    //   defaultValue: Sequelize.UUIDV4,
    //   allowNull: false,
    // unique: true, // Ensure UUIDs are unique
    //});
  },

  down: async (queryInterface, Sequelize) => {},
};
