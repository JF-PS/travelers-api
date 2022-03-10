"use strict";
import { Model } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class Serial_numbers extends Model {
    id!: number;
    name!: string;
  }
  Serial_numbers.init(
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
      modelName: "Serial_numbers",
    }
  );
  return Serial_numbers;
};
