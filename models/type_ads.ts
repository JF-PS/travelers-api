"use strict";
import { Model } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class Type_ads extends Model {
    id!: number;
    name!: string;
  }
  Type_ads.init(
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
      modelName: "Type_ads",
    }
  );
  return Type_ads;
};
