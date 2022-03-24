import mockUserRepository from "../mock/user.mock";
import mockEmailManagment from "../mock/email.mock";
import { hash } from "bcrypt";

import userService from "../../services/user-service";
const service = userService(mockUserRepository, mockEmailManagment);

afterEach(() => {
  jest.clearAllMocks();
});

describe("UserService ==> newPassword Tests : ", () => {
  /**
   *  Test 1 :
   *  title: "Account doesn't exist"
   *  info: « If the account does not exist,
   *  you cannot change the password. »
   */
  test("Account doesn't exist", async () => {
    // Arrange
    const email: string = "email@example.com";
    const token: string = "634a3db6959b6a3f975b90e8869d74af7f";

    const expected = { errorMessage: "Your account doesn't exist!" };

    const checkAccount = (mockUserRepository.checkAccount = jest.fn());
    checkAccount.mockReturnValue(false);

    // Act
    const response: any = await service.newPassword(token, email);

    // Assert
    expect.objectContaining(response);
    expect(response).toEqual(expected);
  });

  /**
   *  Test 2 :
   *  title: "Password change OK"
   *  info: « If the information is correct,
   *  the password change is carried out. »
   */
  test("Password change OK", async () => {
    // Arrange
    const email: string = "email@example.com";
    const name: string = "name";
    const token: string = "634a3db6959b6a3f975b90e8869d74af7f";
    const password: string = "newPassword";
    const hashPassowrd: string = await hash(password, 12);

    const expected = {
      id: 12,
      name,
      email,
      password: hashPassowrd,
    };

    const checkAccount = (mockUserRepository.checkAccount = jest.fn());
    checkAccount.mockReturnValue(expected);

    const createNewPassword = (mockUserRepository.createNewPassword =
      jest.fn());
    createNewPassword.mockReturnValue(expected);

    // Act
    const response: any = await service.newPassword(token, email);

    // Assert
    expect.objectContaining(response);
    expect(response.result).toEqual(expected);
  });
});
