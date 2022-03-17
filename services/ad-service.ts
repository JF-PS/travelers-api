const adService = (repository: any) => ({
  async getAll(query: any) {
    return await repository.getAll(query);
  },
  async getOne(ads: any) {
    return await repository.getOne(ads);
  },
});
export default adService;
