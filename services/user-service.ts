import { compare, hash } from "bcrypt";
import { encrypt, decrypt } from "../utils/crypto";
import { createToken } from "../utils/jwt";
import IUser from "../interfaces/i-user";

const userService = (repository: any, mailing: any) => ({
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

    if (!isPasswordCorrect) return { errorMessage: "Incorrect password" };

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

    const isMailSend = await mailing.sendEmail(
      mailing.writeEmail({ to: email, text })
    );
    if (!isMailSend)
      return { errorMessage: "A problem was encountered with sending email" };

    return { result: newUser };
  },

  async validate(verifyToken: string) {
    const decryptToken = decrypt(verifyToken);
    const id = decryptToken.split("-")[0];
    const email = decryptToken.split("-")[1];

    const isAccount: IUser = await repository.checkAccount(email, id);
    if (!isAccount)
      return { errorMessage: "Your identify key is not available !" };

    const confirmAccount: IUser = await repository.confirmAccount(id);

    return { result: confirmAccount };
  },

  async forgotPassword(email: string) {
    const oldUser: IUser = await repository.getByEmail(email);

    if (!oldUser) return { errorMessage: "User doesn't exist" };

    const verifyToken = encrypt(email);

    const text = `Your forgot your password!
    Click on this link to reset it : /newPassword/${verifyToken}`;

    const isEmailSend = await mailing.sendEmail(
      mailing.writeEmail({ to: email, text })
    );

    if (!isEmailSend)
      return { errorMessage: "A problem was encountered with sending email" };

    return { message: "Email sent" };
  },

  async newPassword(tokenEmail: string, password: string) {
    const decryptToken = decrypt(tokenEmail);

    const isAccountExist: IUser = await repository.checkAccount(decryptToken);

    if (!isAccountExist) return { errorMessage: "Your account doesn't exist!" };

    const hashedPassword: string = await hash(password, 12);

    const confirmNewPassword: IUser = await repository.createNewPassword(
      decryptToken,
      hashedPassword
    );

    return { result: confirmNewPassword };
  },
});

export default userService;
