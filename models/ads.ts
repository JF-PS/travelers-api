"use strict";
import { Model } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class Ads extends Model {
    id!: number;
    vehicle_id!: number;
    user_id!: number;
    type_id!: number;
    address!: string;
    price!: number;
  }
  Ads.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      vehicle_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      type_id: DataTypes.INTEGER,
      address: DataTypes.STRING,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Ads",
    }
  );
  return Ads;
};
