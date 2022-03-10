"use strict";
import { Model } from "sequelize";
import IAdType from "../interfaces/i-ad-type";

module.exports = (sequelize: any, DataTypes: any) => {
  class Ad_type extends Model<IAdType> implements IAdType {
    id!: number;
    name!: string;

    static associate(models: any) {
      Ad_type.hasMany(models.Ad, {
        foreignKey: "type_id",
        as: "ad",
      });
    }
  }
  Ad_type.init(
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
      modelName: "Ad_type",
    }
  );
  return Ad_type;
};
