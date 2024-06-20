const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.Member, {
        foreignKey: 'memberId',
        as: 'member',
      });
    }
  }

  Payment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      memberId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'members',
          key: 'id',
        },
        field: 'memberId',
      },
      type: {
        type: DataTypes.ENUM('pastoralFunds', 'membershipCard'),
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true,
          min: 0,
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
    },
    {
      sequelize,
      tableName: 'payments',
      modelName: 'Payment',
    }
  );

  return Payment;
};
