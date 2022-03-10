import Ad from "../models";
import IAd from "../interfaces/i-ad";
import AdType from "../models";
import Vehicle from "../models";

const Ads = Ad.Ad;
const Vehicles = Vehicle.Vehicle;

const attributesAd: Array<string> = [
  "id",
  "vehicle_id",
  "user_id",
  "type_id",
  "address",
  "price",
];

const attributesAdType: Array<string> = ["id", "name"];

class AdRepository {
  getAll(): Promise<IAd> {
    return new Promise((resolve, reject) => {
      Ads.findAll({
        attributes: attributesAd,
        include: [
          {
            model: AdType,
            as: "type",
            attributes: attributesAdType,
          },
          {
            model: Vehicles,
            as: "vehicle",
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
