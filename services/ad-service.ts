const adService = (repositoryVehicle: any, repositoryAd: any) => ({
  async create(vehicle: any, ad: any) {
    console.log(
      "OK ===================== Vehicle Data ===================== OK"
    );
    console.log(vehicle);
    /* console.log('OK ===================== Ad Service ===================== OK ')
    console.log(ad) */

    const createVehicle = await repositoryVehicle.create(vehicle);
    if (!createVehicle) return { errorMessage: "Vehicle doesn't exist" };

    // const createAd = await repositoryAd.create(/*vehicle.vehicle_id,*/ ad)
    // if (!createAd /*vehicle.vehicle_id*/) return { errorMessage: "Ad doesn't exist" }

    /* console.log('................ Create Ad Service ................')
    console.log(createAd)
    console.log('...................................................')
 */
    return { result: createVehicle };
  },

  async getAll(limit: number, offset: number) {
    return await repositoryAd.getAll(limit, offset);
  },

  async getOne(ads: any) {
    return await repositoryAd.getOne(ads);
  },
});
export default adService;
