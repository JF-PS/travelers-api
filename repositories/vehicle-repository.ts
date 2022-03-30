import Vehicle from "../models";
import IVehicle from "../interfaces/i-vehicle";

const Vehicles = Vehicle.Vehicle;

class VehicleRepository {
  create(vehicle: any): Promise<IVehicle> {
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
}

export default VehicleRepository;
