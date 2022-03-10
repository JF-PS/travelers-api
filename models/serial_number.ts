"use strict";
import { Model } from "sequelize";
import ISerial_number from "../interfaces/i-serial_number";

module.exports = (sequelize: any, DataTypes: any) => {
  class Serial_number extends Model<ISerial_number> implements ISerial_number {
    id!: number;
    name!: string;

    static associate(models: any) {
      Serial_number.hasMany(models.Vehicle, {
        foreignKey: "serial_numbers_id",
        as: "vehicle",
      });
    }
  }
  Serial_number.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Serial_number",
    }
  );
  return Serial_number;
};
