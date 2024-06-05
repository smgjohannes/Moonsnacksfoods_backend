'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
      overlayText: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      shortDescription: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Removing the 'body' column
    await queryInterface.removeColumn('posts', 'body');
    await queryInterface.removeColumn('posts', 'image_url');
  },

  async down(queryInterface, Sequelize) {
    // Adding the 'body' column back
    await queryInterface.addColumn('posts', 'body', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.dropTable('posts');
  },
};
