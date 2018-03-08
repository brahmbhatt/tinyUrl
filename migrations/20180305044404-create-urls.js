

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('urls', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    long_url: {
      type: Sequelize.STRING,
    },
    short_url: {
      type: Sequelize.STRING(6),
      allowNull: false,
      unique: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('urls'),
};
