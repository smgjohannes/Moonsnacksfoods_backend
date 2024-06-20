'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('members', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      id_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      name: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date_of_birth: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      age: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      member_of: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      local_church: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      from_date: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      father: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mother: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      slug: { type: Sequelize.STRING, allowNull: false, unique: true },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('members');
  },
};
