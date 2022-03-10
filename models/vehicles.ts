"use strict";
import { Model } from "sequelize";
import IVehicles from "../interfaces/i-vehicles";

module.exports = (sequelize: any, DataTypes: any) => {
  class Vehicles extends Model<IVehicles> implements IVehicles {
    id!: number;
    category_id!: number;
    sub_category_id!: number;
    brand_id!: number;
    serial_numbers_id!: number;
    gas_id!: number;
    horsepower_id!: number;
    year!: Date;
    date_circulation!: Date;
    kilometers!: number;

    static associate(models: any) {
      Vehicles.belongsTo(models.Gas, {
        foreignKey: "gas_id",
        as: "gas",
      });
    }
  }
  Vehicles.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      category_id: DataTypes.INTEGER,
      sub_category_id: DataTypes.INTEGER,
      brand_id: DataTypes.INTEGER,
      serial_numbers_id: DataTypes.INTEGER,
      gas_id: DataTypes.INTEGER,
      horsepower_id: DataTypes.INTEGER,
      year: DataTypes.DATE,
      date_circulation: DataTypes.DATE,
      kilometers: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Vehicles",
    }
  );
  return Vehicles;
};
