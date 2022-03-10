"use strict";
import { Model } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class Category extends Model {
    id!: number;
    name!: string;
  }
  Category.init(
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
      modelName: "Category",
    }
  );
  return Category;
};
