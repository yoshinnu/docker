'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.posts, {
        foreignKey: 'user_id',
        sourceKey: 'id'
      });

    }
  };
  Users.init({
    username: DataTypes.STRING,
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};