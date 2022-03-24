class EmailManagment {
  name: string;
  constructor() {
    this.name = "test";
  }
  public writeEmail(): any {
    throw new Error("Method not implemented.");
  }

  public sendEmail(): any {
    throw new Error("Method not implemented.");
  }
}

export default new EmailManagment();
