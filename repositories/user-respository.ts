import User from "../models";
import IUser from "../interfaces/i-user";
const Users = User.User;

const attributes: Array<string> = [
  "id",
  "name",
  "email",
  "password",
  "validation",
];

class UserRepository {
  getByEmail(email: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      Users.findOne({
        attributes,
        where: { email },
      })
        .then((user: IUser) => {
          resolve(user);
        })
        .catch((err: any) => {
          console.error(err);
          reject(err);
        });
    });
  }

  checkAccount(id: number, email: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      Users.findOne({
        attributes,
        where: { id, email },
      })
        .then((user: IUser) => {
          resolve(user);
        })
        .catch((err: any) => {
          console.error(err);
          reject(err);
        });
    });
  }

  createUser(user: any): Promise<IUser> {
    return new Promise((resolve, reject) => {
      Users.create(user)
        .then((newUser: IUser) => {
          const { id, name, email, password, validation } = newUser;
          resolve({ id, name, email, password, validation });
        })
        .catch((err: any) => {
          console.error(err);
          reject(err);
        });
    });
  }

  confirmAccount(id: number): Promise<IUser> {
    return new Promise((resolve, reject) => {
      Users.findOne({ attributes, where: { id } })
        .then((userAccount: any) => {
          resolve(userAccount.update({ validation: true }));
        })
        .catch((err: any) => {
          console.log(err);
          reject(err);
        });
    });
  }
}

export default UserRepository;
