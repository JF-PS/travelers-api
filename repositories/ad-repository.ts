import Ad from "../models";
import IAd from "../interfaces/i-ad";
import Ad_type from "../models";
import Vehicle from "../models";
import Horsepower from "../models";

const Ads = Ad.Ad;
const AdsTypes = Ad_type.Ad_type;
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
  getAll(): Promise<IAd> {
    return new Promise((resolve, reject) => {
      Ads.findAll({
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
}

export default AdRepository;
