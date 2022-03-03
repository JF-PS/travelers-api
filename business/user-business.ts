import { compare, hash } from "bcrypt";
import IUser from "../interfaces/i-user";
import jwt from "jsonwebtoken";
const secret = "test";

const checkPassword = (password: string, pass: string) => {
  return compare(password, pass);
};

const createToken = (user: any) => {
  const { id, email } = user;
  return jwt.sign({ email, id }, secret, {
    expiresIn: "1h",
  });
};

const userBusiness = (repository: any) => ({
  async signIn(user: any) {
    const { email, password } = user;

    const currentUser: IUser = await repository.getByEmail(email);

    if (!currentUser) return { errorMessage: "User doesn't exist" };

    const isPasswordCorrect: boolean = await checkPassword(
      password,
      currentUser.password
    );

    if (!isPasswordCorrect) return { errorMessage: "Invalid credentials" };

    const token: string = createToken(currentUser);

    return { result: currentUser, token };
  },

  async signUp(user: any) {
    const { name, email, password } = user;

    const oldUser: IUser = await repository.getByEmail(email);

    if (oldUser) return { errorMessage: "User already exists" };

    const hashedPassword: string = await hash(password, 12);

    const newUser: IUser = await repository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    const token: string = createToken(newUser);

    return { result: newUser, token };
  },
});

export default userBusiness;
