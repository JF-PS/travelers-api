import User from "../models";
import IUser from "../interfaces/i-user";
const Users = User.User;

class UserRepository {
  getByEmail(email: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      Users.findOne({
        where: { email },
      })
        .then((user: any) => {
          resolve(user);
        })
        .catch((err: any) => {
          console.log("Error :");
          console.log(err);
          reject(err);
        });
    });
  }

  createUser(user: any): Promise<IUser> {
    return new Promise((resolve, reject) => {
      Users.create(user)
        .then((newUser: any) => {
          resolve(newUser);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}

export default UserRepository;
