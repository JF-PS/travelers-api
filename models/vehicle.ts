"use strict";
import { Model } from "sequelize";
import IVehicle from "../interfaces/i-vehicle";

module.exports = (sequelize: any, DataTypes: any) => {
  class Vehicle extends Model<IVehicle> implements IVehicle {
    id!: number;
    category_id!: number;
    sub_category_id!: number;
    brand_id!: number;
    serial_number_id!: number;
    gas_id!: number;
    horsepower_id!: number;
    year!: Date;
    date_circulation!: Date;
    kilometers!: number;

    static associate(models: any) {
      Vehicle.belongsTo(models.Gas, {
        foreignKey: "gas_id",
        as: "gas",
      });

      Vehicle.belongsTo(models.Serial_number, {
        foreignKey: "serial_number_id",
        as: "serial_number",
      });

      Vehicle.belongsTo(models.Sub_category, {
        foreignKey: "sub_category_id",
        as: "sub_category",
      });

      Vehicle.belongsTo(models.Brand, {
        foreignKey: "brand_id",
        as: "brand",
      });
    }
  }
  Vehicle.init(
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
      serial_number_id: DataTypes.INTEGER,
      gas_id: DataTypes.INTEGER,
      horsepower_id: DataTypes.INTEGER,
      year: DataTypes.DATE,
      date_circulation: DataTypes.DATE,
      kilometers: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Vehicle",
    }
  );
  return Vehicle;
};
