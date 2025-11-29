'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'password_reset', {
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: 0, // false - não precisa trocar senha
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'password_reset');
  }
};
