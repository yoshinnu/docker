'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      posts.belongsTo(models.Users, {
        onDelete: "CASCADE",
        foreignKey: "id"
      });
    }
  };
  posts.init({
    user_id: DataTypes.INTEGER,
    auther: DataTypes.STRING,
    title: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'posts',
    underscored: true,
  });
  return posts;
};