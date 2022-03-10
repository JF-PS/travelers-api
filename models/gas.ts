"use strict";
import { Model } from "sequelize";
import IGas from "../interfaces/i-gas";

module.exports = (sequelize: any, DataTypes: any) => {
  class Gas extends Model<IGas> implements IGas {
    id!: number;
    name!: string;

    static associate(models: any) {
      Gas.hasMany(models.Vehicles, {
        foreignKey: "gas_id",
        as: "vehicles",
      });
    }
  }
  Gas.init(
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
      modelName: "Gas",
    }
  );
  return Gas;
};
