import mockUserRepository from "../mock/user.mock";
import mockEmailManagment from "../mock/email.mock";
import { hash } from "bcrypt";

import userService from "../../services/user-service";
const service = userService(mockUserRepository, mockEmailManagment);

afterEach(() => {
  jest.clearAllMocks();
});

describe("UserService ==> forgotPassword Tests : ", () => {
  /**
   *  Test 1 :
   *  title: "User doesn't exist"
   *  info: « If the email does not exist,
   *  we cannot send a password renewal email. »
   */
  test("User doesn't exist", async () => {
    // Arrange
    const email: string = "email@example.com";
    const expected = { errorMessage: "User doesn't exist" };

    const getByEmail = (mockUserRepository.getByEmail = jest.fn());
    getByEmail.mockReturnValue(false);

    // Act
    const response: any = await service.forgotPassword(email);

    // Assert
    expect.objectContaining(response);
    expect(response).toEqual(expected);
  });

  /**
   *  Test 2 :
   *  title: "Problem sending email"
   *  info: « If a problem occurs while
   *  sending, an error message occurs »
   */
  test("Problem sending email", async () => {
    // Arrange
    const email: string = "email@example.com";
    const expected = {
      errorMessage: "A problem was encountered with sending email",
    };

    const getByEmail = (mockUserRepository.getByEmail = jest.fn());
    getByEmail.mockReturnValue(true);

    const writeEmail = (mockEmailManagment.writeEmail = jest.fn());
    writeEmail.mockReturnValue(true);

    const sendEmail = (mockEmailManagment.sendEmail = jest.fn());
    sendEmail.mockReturnValue(false);

    // Act
    const response: any = await service.forgotPassword(email);

    // Assert
    expect.objectContaining(response);
    expect(response).toEqual(expected);
  });

  /**
   *  Test 3 :
   *  title: "Send a password renewal email Ok"
   *  info: « The sending of the password
   *  renewal email has been sent »
   */
  test("Send a password renewal email Ok", async () => {
    // Arrange
    const email: string = "email@example.com";
    const expected = { message: "Email sent" };

    const getByEmail = (mockUserRepository.getByEmail = jest.fn());
    getByEmail.mockReturnValue(true);

    const writeEmail = (mockEmailManagment.writeEmail = jest.fn());
    writeEmail.mockReturnValue(true);

    const sendEmail = (mockEmailManagment.sendEmail = jest.fn());
    sendEmail.mockReturnValue(true);

    // Act
    const response: any = await service.forgotPassword(email);

    // Assert
    expect.objectContaining(response);
    expect(response).toEqual(expected);
  });
});
