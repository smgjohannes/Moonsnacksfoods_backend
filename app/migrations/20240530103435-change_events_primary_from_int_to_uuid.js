'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Events');
    await queryInterface.createTable('events', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      title: {
        type: Sequelize.STRING,
      },
      slug: { type: Sequelize.STRING, allowNull: false, unique: true },
      location: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['draft', 'published'],
        defaultValue: 'draft',
      },
      published: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      start_date: { type: Sequelize.DATE, allowNull: true },
      start_date: { type: Sequelize.DATE, allowNull: true },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('events');
  },
};
