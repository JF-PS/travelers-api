import Vehicle from "../models";
import Gas from "../models";
import IVehicle from "../interfaces/i-vehicle";

const Vehicles = Vehicle.Vehicle;
const Gass = Gas.Gas;

const attributesVehicles: Array<string> = [
  "id",
  "category_id",
  "sub_category_id",
  "brand_id",
  "serial_number_id",
  "gas_id",
  "horsepower_id",
  "year",
  "date_circulation",
  "kilometers",
];

const attributesGas: Array<string> = ["id", "name"];

class VehicleRepository {
  create(vehicle: any): Promise<IVehicle> {
    console.log("----------- Vehicle repo --------------");
    console.log(vehicle);
    console.log("-------------------------");

    return new Promise((resolve, reject) => {
      Vehicles.create(vehicle)
        .then((newVehicle: IVehicle) => {
          resolve(newVehicle);
        })
        .catch((err: any) => {
          console.log(err);
          reject(err);
        });
    });
  }

  getAll(): Promise<IVehicle> {
    return new Promise((resolve, reject) => {
      Vehicles.findAll({
        attributes: attributesVehicles,
        include: [
          {
            model: Gass,
            as: "gas",
            attributes: attributesGas,
          },
        ],
      })
        .then((vehicles: IVehicle) => {
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
