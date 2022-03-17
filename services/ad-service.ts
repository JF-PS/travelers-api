const adService = (repository: any) => ({
  async getAll(limit: number, offset: number) {
    return await repository.getAll(limit, offset);
  },
  async getOne(ads: any) {
    return await repository.getOne(ads);
  },
  async deleteOne(ads: any) {
    return await repository.deleteOne(ads);
  },
});
export default adService;
