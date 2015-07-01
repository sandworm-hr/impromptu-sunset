'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.TEXT
      },
      visibility: {
        type: Sequelize.TEXT
      },
      session_time: {
        type: Sequelize.INTEGER
      },
      word_count: {
        type: Sequelize.INTEGER
      },
      scores: {
        type: Sequelize.JSON
      },
      char_count: {
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.TEXT
      },
      UserId: {
        type: Sequelize.INTEGER,
        model: 'Users',
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
    return queryInterface.dropTable('Sessions');
  }
};