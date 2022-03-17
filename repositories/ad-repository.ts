import Ad from "../models";
import IAd from "../interfaces/i-ad";
import AdType from "../models";
import Vehicle from "../models";
import Horsepower from "../models";

const Ads = Ad.Ad;
const AdsTypes = AdType.AdType;
const Vehicles = Vehicle.Vehicle;
const Horsepowers = Horsepower.Horsepower;

const attributesAd: Array<string> = ["id", "user_id", "address", "price"];

const attributesAdType: Array<string> = ["id", "name"];
const attributesVehicle: Array<string> = [
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

  getAll(limit: number, offset: number): Promise<IAd> {
    return new Promise((resolve, reject) => {
      Ads.findAndCountAll({
        limit,
        offset,
        // where (pour les différents filtres)
        attributes: attributesAd,
        include: [
          {
            model: AdsTypes,
            as: "type",
            attributes: attributesAdType,
          },
          {
            model: Vehicles,
            as: "vehicle",
            attributes: attributesVehicle,
            include: [
              {
                model: Horsepowers,
                as: "horsepower",
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

  getOne(id: number): Promise<IAd> {
    return new Promise((resolve, reject) => {
      Ads.findByPk(id, {
        attributes: attributesAd,
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
