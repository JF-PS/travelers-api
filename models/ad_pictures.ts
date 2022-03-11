"use strict";
import { Model } from "sequelize";
import IAdPictures from "../interfaces/i-ad-pictures";

module.exports = (sequelize: any, DataTypes: any) => {
  class AdPictures extends Model<IAdPictures> implements IAdPictures {
    id!: number;
    ad_id!: number;
    source!: string;

    static associate(models: any) {
      AdPictures.belongsTo(models.Ad, {
        foreignKey: "ad_id",
        as: "ad",
      });
    }
  }
  AdPictures.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      ad_id: DataTypes.INTEGER,
      source: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AdPictures",
    }
  );
  return AdPictures;
};
