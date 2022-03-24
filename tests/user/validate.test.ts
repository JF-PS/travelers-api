import mockUserRepository from "../mock/user.mock";
import mockEmailManagment from "../mock/email.mock";
import { hash } from "bcrypt";

import userService from "../../services/user-service";
const service = userService(mockUserRepository, mockEmailManagment);

afterEach(() => {
  jest.clearAllMocks();
});

describe("UserService ==> Validate Tests : ", () => {
  /**
   *  Test 1 :
   *  title: "Invalid Token"
   *  info: « If the token is bad, the
   *  account confirmation will fail »
   */
  test("Invalid Token", async () => {
    // Arrange
    const verifyToken = "errorToken";
    const expected = { errorMessage: "Your identify key is not available !" };

    const checkAccount = (mockUserRepository.checkAccount = jest.fn());
    checkAccount.mockReturnValue(false);

    // Act
    const response: any = await service.validate(verifyToken);

    // Assert
    expect.objectContaining(response);
    expect(response).toEqual(expected);
  });

  /**
   *  Test 2 :
   *  title: "Account verification Ok"
   *  info: « If the user sends the correct
   *  token, then the account is validated »
   */
  test("Account verification Ok", async () => {
    // Arrange
    const verifyToken =
      "734938ba9fb26122921b8eeb979d71af670f4dc01aa9cd979676392cc3";
    const id: number = 1;
    const name: string = "name";
    const email: string = "email@example.com";
    const password: string = "password";
    const hashPassowrd: string = await hash(password, 12);

    const expected = {
      id,
      name,
      email,
      password: hashPassowrd,
    };

    const checkAccount = (mockUserRepository.checkAccount = jest.fn());
    checkAccount.mockReturnValue({ ...expected, validate: false });

    const confirmAccount = (mockUserRepository.confirmAccount = jest.fn());
    confirmAccount.mockReturnValue({ ...expected, validate: true });

    // Act
    const response: any = await service.validate(verifyToken);

    // Assert
    expect.objectContaining(response);
    expect(response.result).toEqual({ ...expected, validate: true });
  });
});
