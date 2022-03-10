const adService = (repository: any) => ({
  async getAll(ads: any) {
    return await repository.getAll(ads);
  },
});
export default adService;
