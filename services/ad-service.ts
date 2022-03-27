import IUser from "../interfaces/i-user";

const adService = (
  repositoryVehicle: any,
  repositoryAd: any,
  repositoryUser: any
) => ({
  async checkAuthorization(userId: number, adId: any = null) {
    const currentUser: IUser = await repositoryUser.getById(userId);
    if (!currentUser) return { errorMessage: "User doesn't exist" };
    if (currentUser.validation === false)
      return { errorMessage: "Your account is not yet validated" };

    if (adId) {
      const ad = await repositoryAd.getOne(adId);
      if (ad.user_id !== userId) {
        return { errorMessage: "You do not have permission for this action" };
      }
    }

    return null;
  },

  async create(vehicle: any, ad: any) {
    const { user_id } = ad;
    const userAuthorization: any = await this.checkAuthorization(user_id);
    if (userAuthorization) return userAuthorization;

    const createVehicle = await repositoryVehicle.create(vehicle);
    if (!createVehicle)
      return { errorMessage: "An error occurred while creating the vehicle" };

    const createAd = await repositoryAd.create(createVehicle.id, ad);
    if (!createAd)
      return { errorMessage: "An error occurred while creating the ad" };

    return { result: createAd };
  },

  async getAll(query: any) {
    const result = await repositoryAd.getAll(query);
    return { result };
  },

  async getOne(adId: number) {
    const result = await repositoryAd.getOne(adId);
    return { result };
  },

  async deleteOne(adId: number, userId: number) {
    const userAuthorization: any = await this.checkAuthorization(userId, adId);
    if (userAuthorization) return userAuthorization;
    const result = await repositoryAd.deleteOne(adId);
    return { result };
  },

  async updateOne(adId: number, ad: any, userId: number) {
    const userAuthorization: any = await this.checkAuthorization(userId, adId);
    if (userAuthorization) return userAuthorization;
    const result = await repositoryAd.updateOne(adId, ad);
    return { result };
  },
});
export default adService;
