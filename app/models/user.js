const { Model } = require('sequelize');
const { USER_ROLE_LIST } = require('../utils/constants');
const passwordUtils = require('../utils/password');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // user can have many notifications
      User.hasMany(models.Token, {
        foreignKey: 'user_id',
        sourceKey: 'id',
        as: 'tokens',
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(USER_ROLE_LIST),
        allowNull: false,
        defaultValue: 'user',
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  );

  User.prototype.toJSON = function toJSON() {
    const docs = { ...this.get() };
    delete docs.password;
    return docs;
  };

  User.prototype.compareHash = async function compareHash(password) {
    return passwordUtils.compare(password, this.get('password'));
  };

  return User;
};
