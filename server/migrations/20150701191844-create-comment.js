'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.TEXT
      },
      from: {
        type: Sequelize.INTEGER,
        model: 'Users',
        key: 'id'
      },
      UserId: {
        type: Sequelize.INTEGER,
        model: 'Users',
        key: 'id'
      },
      SessionId: {
        type: Sequelize.INTEGER,
        model: 'Sessions',
        key: 'id'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Comments');
  }
};