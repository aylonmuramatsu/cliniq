'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    
    await queryInterface.bulkInsert('users', [{
      name: 'Administrador',
      email: 'admin@cliniq.com',
      password: hashedPassword,
      role: 0, // Operator (Admin)
      status: 1, // Active
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: 'admin@cliniq.com'
    }, {});
  }
};
