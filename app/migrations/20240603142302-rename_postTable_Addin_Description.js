'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('posts', 'short_description', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn('posts', 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn('posts', 'overlay_text', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },
};
