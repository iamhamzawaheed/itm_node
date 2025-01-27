'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: true,  // You can set it to false if you want it to be non-nullable
      defaultValue: null,  // Optional: Set a default value
    });
  },

  async down (queryInterface, Sequelize) {
    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('Users', 'phoneNumber');
    }
  }
};
