const adService = (repository: any) => ({
  async getAll(limit: number, offset: number) {
    return await repository.getAll(limit, offset);
  },
});
export default adService;
