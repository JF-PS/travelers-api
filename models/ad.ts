"use strict";
import { Model } from "sequelize";
import IAd from "../interfaces/i-ad";

module.exports = (sequelize: any, DataTypes: any) => {
  class Ad extends Model<IAd> implements IAd {
    id!: number;
    vehicle_id!: number;
    user_id!: number;
    type_id!: number;
    //ad_pictures_id!: number;
    address!: string;
    price!: number;

    static associate(models: any) {
      Ad.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      Ad.belongsTo(models.Vehicle, {
        foreignKey: "vehicle_id",
        as: "vehicle",
      });

      Ad.belongsTo(models.AdType, {
        foreignKey: "type_id",
        as: "type",
      });

      Ad.hasMany(models.AdPictures, {
        foreignKey: "Ad_pictures_id",
        as: "AdPictures",
      });
    }
  }

  Ad.init(
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
      modelName: "Ad",
    }
  );
  return Ad;
};
