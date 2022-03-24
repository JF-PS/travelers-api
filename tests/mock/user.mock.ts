class UserRepository {
  name: string;
  constructor() {
    this.name = "test";
  }
  public getByEmail(email: string): any {
    throw new Error("Method not implemented.");
  }

  public checkAccount(email: string, id: number = 0): any {
    throw new Error("Method not implemented.");
  }

  public createUser(user: any): any {
    throw new Error("Method not implemented.");
  }

  public confirmAccount(id: number): any {
    throw new Error("Method not implemented.");
  }

  public createNewPassword(email: string, password: string): any {
    throw new Error("Method not implemented.");
  }
}

export default new UserRepository();
