import { compare, hash } from "bcrypt";
import IUser from "../interfaces/i-user";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import { idText } from "typescript";
import crypto from "crypto";

const secret = "test";
const algorithm = "aes-256-ctr";
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
const iv = crypto.randomBytes(16);

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

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const verifyToken = Buffer.concat([
      cipher.update(`${email}-${newUser.id}`),
      cipher.final(),
    ]);
    console.log(`${verifyToken.toString("hex")}`);
    sgMail.setApiKey(
      "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"
    );

    const msg = {
      to: email, // Change to your recipient
      from: "morgane.duluc@gmail.com", // Change to your verified sender
      subject: "Confirmation de création de compte :)",
      text: `Merci d'avoir créé un compte chez nous, veuillez confirmer votre compte !
      Voici l'url : /verify/${verifyToken.toString("hex")}`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error: any) => {
        console.error(error);
      });

    const token: string = createToken(newUser);

    return { result: newUser, token };
  },

  async validate(verifyToken: any) {
    console.log(
      "==================================================================="
    );
    console.log(verifyToken);
    console.log(
      "==================================================================="
    );

    const decipher = crypto.createDecipheriv(
      algorithm,
      secretKey,
      Buffer.from(iv.toString("hex"), "hex")
    );
    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(verifyToken, "hex")),
      decipher.final(),
    ]);
    console.log(decrpyted.toString());
    return decrpyted.toString();
  },
});

export default userBusiness;
