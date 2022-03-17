import { Op } from "@sequelize/core";

import Ad from "../models";
import IAd from "../interfaces/i-ad";
import AdType from "../models";
import Vehicle from "../models";
import Horsepower from "../models";
import SerialNumber from "../models";
import Brand from "../models";
import Category from "../models";
import SubCategory from "../models";
import AdPicture from "../models";

const Ads = Ad.Ad;
const AdsTypes = AdType.AdType;
const AdsPictures = AdPicture.AdPicture;
const Vehicles = Vehicle.Vehicle;
const Horsepowers = Horsepower.Horsepower;
const SerialNumbers = SerialNumber.SerialNumber;
const Brands = Brand.Brand;
const Categories = Category.Category;
const SubCategories = SubCategory.SubCategory;

const attributesAd: Array<string> = [
  "id",
  "title",
  "user_id",
  "address",
  "price",
  "picture_id",
];

const baseAttribute: Array<string> = ["id", "name"];
const pictureAttribute: Array<string> = ["id", "ad_id", "source"];
const attributesVehicle: Array<string> = [
  "id",
  "kilometers",
  "date_circulation",
];

class AdRepository {
  getAll(query: any): Promise<IAd> {
    const { limit = 25, offset = 0, title = "" } = query;
    return new Promise((resolve, reject) => {
      Ads.findAndCountAll({
        attributes: attributesAd,
        limit,
        offset,
        where: {
          title: { [Op.substring]: title },
        },
        include: [
          {
            model: AdsTypes,
            as: "type",
            attributes: baseAttribute,
          },
          {
            model: Vehicles,
            as: "vehicle",
            attributes: attributesVehicle,
            include: [
              {
                model: Horsepowers,
                as: "horsepower",
                attributes: baseAttribute,
              },
            ],
          },
        ],
      })
        .then((ad: IAd) => {
          resolve(ad);
        })
        .catch((err: any) => {
          console.log(err);
          reject(err);
        });
    });
  }

  getOne(id: number): any {
    return new Promise((resolve, reject) => {
      Ads.findByPk(id, {
        attributes: [...attributesAd, "description"],
        include: [
          {
            model: AdsTypes,
            as: "type",
            attributes: baseAttribute,
          },
          {
            model: AdsPictures,
            as: "AdPictures",
            attributes: pictureAttribute,
          },
          {
            model: Vehicles,
            as: "vehicle",
            attributes: attributesVehicle,
            include: [
              {
                model: Horsepowers,
                as: "horsepower",
                attributes: baseAttribute,
              },
              {
                model: SerialNumbers,
                as: "serialNumber",
                attributes: baseAttribute,
              },
              {
                model: Brands,
                as: "brand",
                attributes: baseAttribute,
              },
              {
                model: Categories,
                as: "category",
                attributes: baseAttribute,
              },
              {
                model: SubCategories,
                as: "subCategory",
                attributes: baseAttribute,
              },
            ],
          },
        ],
      })
        .then((ad: IAd) => {
          resolve(ad);
        })
        .catch((err: any) => {
          console.log(err);
          reject(err);
        });
    });
  }
}

export default AdRepository;
