const adService = (repository: any) => ({
  async getAll(ads: any) {
    return await repository.getAll(ads);
  },
  async getOne(ads: any) {
    return await repository.getOne(ads);
  },
});
export default adService;
