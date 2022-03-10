import Vehicles from "../models";
import Gas from "../models";
import IVehicles from "../interfaces/i-vehicles";

const Vehicle = Vehicles.Vehicles;
const Gass = Gas.Gas;

const attributesVehicles: Array<string> = [
  "id",
  "category_id",
  "sub_category_id",
  "brand_id",
  "serial_numbers_id",
  "gas_id",
  "horsepower_id",
  "year",
  "date_circulation",
  "kilometers",
];

const attributesGas: Array<string> = ["id", "name"];

class VehicleRepository {
  getAll(): Promise<IVehicles> {
    return new Promise((resolve, reject) => {
      Vehicle.findAll({
        attributes: attributesVehicles,
        include: [
          {
            model: Gass,
            as: "gas",
            attributes: attributesGas,
          },
        ],
      })
        .then((vehicles: IVehicles) => {
          console.log(vehicles);
          resolve(vehicles);
        })
        .catch((err: any) => {
          console.log(err);
          reject(err);
        });
    });
  }
}

export default VehicleRepository;
