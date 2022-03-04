import { compare, hash } from "bcrypt";
import { encrypt, decrypt } from "../utils/crypto";
import { writeEmail, sendEmail } from "../utils/sendgrid";
import { createToken } from "../utils/jwt";
import IUser from "../interfaces/i-user";

const userService = (repository: any) => ({
  async signIn(user: any) {
    const { email, password } = user;

    const currentUser: IUser = await repository.getByEmail(email);

    if (!currentUser) return { errorMessage: "User doesn't exist" };
    if (!currentUser.validation)
      return { errorMessage: "Your account is not yet validate !" };

    const isPasswordCorrect: boolean = await compare(
      password,
      currentUser.password
    );

    if (!isPasswordCorrect) return { errorMessage: "Invalid credentials" };

    const token: string = createToken({
      email: currentUser.email,
      id: currentUser.id,
    });

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

    const { id } = newUser;

    const verifyToken = encrypt(`${id}-${email}`);

    const text = `Thanks for creating an account, please confirm your email !
    Click go to : /validate/${verifyToken}`;

    sendEmail(writeEmail({ to: email, text }));

    const token: string = createToken({ email, id });

    return { result: newUser, token };
  },

  async validate(verifyToken: string) {
    const decryptToken = decrypt(verifyToken);
    const id = decryptToken.split("-")[0];
    const email = decryptToken.split("-")[1];

    const isAccount: IUser = await repository.checkAccount(id, email);
    if (!isAccount)
      return { errorMessage: "Your identify key is not available !" };

    const confirmAccount: IUser = await repository.confirmAccount(id);

    return { result: confirmAccount };
  },
});

export default userService;
