"use strict";
import { Model } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class Ads_pictures extends Model {
    id!: number;
    ads_id!: number;
    source!: string;
  }
  Ads_pictures.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      ads_id: DataTypes.INTEGER,
      source: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Ads_pictures",
    }
  );
  return Ads_pictures;
};
