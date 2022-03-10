"use strict";
import { Model } from "sequelize";
import ISub_category from "../interfaces/i-sub_category";

module.exports = (sequelize: any, DataTypes: any) => {
  class Sub_category extends Model<ISub_category> implements ISub_category {
    id!: number;
    name!: string;

    static associate(models: any) {
      Sub_category.hasMany(models.Vehicle, {
        foreignKey: "sub_category_id",
        as: "vehicle",
      });
    }
  }
  Sub_category.init(
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
      modelName: "Sub_category",
    }
  );
  return Sub_category;
};
