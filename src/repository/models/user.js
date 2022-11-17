"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSaltSync(8);
  return await bcrypt.hash(password, salt);
};

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.TINYINT(1),
      // role: DataTypes.ENUM("ROOT", "DIRECTOR", "ADMIN"),
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      hooks: {
        beforeCreate: async (record, options) => {
          record.dataValues.password = await hashPassword(
            record.dataValues.password
          );
        },
        beforeUpdate: async (record, options) => {
          if (record.dataValues.password) {
            record.dataValues.password = await hashPassword(
              record.dataValues.password
            );
          }
        },
      },
    }
  );

  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };
  User.prototype.verifyPassword = async function (password) {
    const values = Object.assign({}, this.get());
    return await bcrypt.compare(password, values.password);
  };

  return User;
};
