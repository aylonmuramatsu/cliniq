'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Get the foreign key constraint name
    const [results] = await queryInterface.sequelize.query(
      `SELECT CONSTRAINT_NAME 
       FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
       WHERE TABLE_SCHEMA = DATABASE() 
       AND TABLE_NAME = 'plans' 
       AND COLUMN_NAME = 'user_id' 
       AND REFERENCED_TABLE_NAME IS NOT NULL`
    );
    
    if (results.length > 0) {
      const constraintName = results[0].CONSTRAINT_NAME;
      await queryInterface.removeConstraint('plans', constraintName);
    }
    
    // Remove the column
    await queryInterface.removeColumn('plans', 'user_id');
  },

  async down (queryInterface, Sequelize) {
    // Add the column back
    await queryInterface.addColumn('plans', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  }
};
