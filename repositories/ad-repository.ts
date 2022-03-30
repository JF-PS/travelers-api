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
import { adOrder } from "../utils/order";

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
const vehicleAttributes: Array<string> = [
  "id",
  "kilometers",
  "date_circulation",
];

class AdRepository {
  create(id: number, ad: any): Promise<IAd> {
    ad.vehicle_id = id;
    return new Promise((resolve, reject) => {
      Ads.create(ad)
        .then((newAd: IAd) => {
          resolve(newAd);
        })
        .catch((err: any) => {
          console.log(err);
          reject(err);
        });
    });
  }

  getAll(query: any): Promise<IAd> {
    const {
      limit = 25,
      offset = 0,
      title = "",
      orderBy = "createDesc",
      min = 0,
      max = null,
      type = null,
      gas = null,
    } = query;

    const where: any = {
      title: { [Op.substring]: title },
      price: { [Op.gte]: min },
    };
    if (max !== null) where.price = { ...where.price, [Op.lte]: max };
    if (type !== null) where.type_id = type;

    const whereGas: any = {};
    if (gas !== null) whereGas.gas_id = gas;

    return new Promise((resolve, reject) => {
      Ads.findAndCountAll({
        attributes: attributesAd,
        limit,
        offset,
        where,
        order: adOrder(orderBy),
        include: [
          {
            model: AdsTypes,
            as: "type",
            attributes: baseAttribute,
          },
          {
            model: Vehicles,
            as: "vehicle",
            attributes: vehicleAttributes,
            where: whereGas,
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
            attributes: vehicleAttributes,
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

  deleteOne(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      Ads.findByPk(id)
        .then((ad: any) => {
          Vehicles.findByPk(ad.vehicle_id)
            .then((vehicle: any) => {
              ad.destroy();
              vehicle.destroy();
              resolve({});
            })
            .catch((err: any) => {
              console.log(err);
              reject(err);
            });
        })
        .catch((err: any) => {
          console.log(err);
          reject(err);
        });
    });
  }

  updateOne(id: number, ad: any): Promise<any> {
    return new Promise((resolve, reject) => {
      Ads.findByPk(id)
        .then((updateAd: any) => {
          resolve(updateAd.update(ad));
        })
        .catch((err: any) => {
          console.log(err);
          reject(err);
        });
    });
  }
}

export default AdRepository;
