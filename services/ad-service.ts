const adService = (repositoryVehicle: any, repositoryAd: any) => ({
  async create(vehicle: any, ad: any) {
    const createVehicle = await repositoryVehicle.create(vehicle);
    if (!createVehicle) return { errorMessage: "Vehicle doesn't exist" };

    const createAd = await repositoryAd.create(createVehicle.id, ad);
    if (!createAd /*vehicle.vehicle_id*/)
      return { errorMessage: "Ad doesn't exist" };

    return { result: createAd };
  },

  async getAll(query: any) {
    return await repositoryAd.getAll(query);
  },

  async getOne(ads: any) {
    return await repositoryAd.getOne(ads);
  },
});
export default adService;
