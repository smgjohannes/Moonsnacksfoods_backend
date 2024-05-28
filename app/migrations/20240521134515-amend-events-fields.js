'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Events', 'start_date', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('Events', 'end_date', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.changeColumn('Events', 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.removeColumn('Events', 'image_url');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Events', 'image_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('Events', 'description', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.removeColumn('Events', 'start_date');
    await queryInterface.removeColumn('Events', 'end_date');
  },
};
