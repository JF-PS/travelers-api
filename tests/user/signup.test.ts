import mockUserRepository from "../mock/user.mock";
import mockEmailManagment from "../mock/email.mock";
import { hash } from "bcrypt";

import userService from "../../services/user-service";
const service = userService(mockUserRepository, mockEmailManagment);

afterEach(() => {
  jest.clearAllMocks();
});

describe("UserService ==> SignUp Tests : ", () => {
  /**
   *  Test 1 :
   *  title: "User already exists"
   *  info: « If the user already exists the
   *  account creation is impossible »
   */
  test("User already exists", async () => {
    const name: string = "name";
    const email: string = "email@example.com";
    const password: string = "password";

    // Arrange
    const params = {
      name,
      email,
      password,
    };

    const expected = { errorMessage: "User already exists" };

    const getByEmail = (mockUserRepository.getByEmail = jest.fn());
    getByEmail.mockReturnValue(true);

    // Act
    const response: any = await service.signUp(params);

    // Assert
    expect.objectContaining(response);
    expect(response).toEqual(expected);
  });

  /**
   *  Test 2 :
   *  title: "Email not found"
   *  info: « If the email is not found,
   *  sending it to email is impossible »
   */
  test("Email not found", async () => {
    const name: string = "name";
    const email: string = "not.found@error.com";
    const password: string = "password";

    // Arrange
    const params = {
      name,
      email,
      password,
    };

    const expected = {
      errorMessage: "A problem was encountered with sending email",
    };

    const getByEmail = (mockUserRepository.getByEmail = jest.fn());
    getByEmail.mockReturnValue(false);

    const createUser = (mockUserRepository.createUser = jest.fn());
    createUser.mockReturnValue(expected);

    const writeEmail = (mockEmailManagment.writeEmail = jest.fn());
    writeEmail.mockReturnValue(true);

    const sendEmail = (mockEmailManagment.sendEmail = jest.fn());
    sendEmail.mockReturnValue(false);

    // Act
    const response: any = await service.signUp(params);

    // Assert
    expect.objectContaining(response);
    expect(response).toEqual(expected);
  });

  /**
   *  Test 3 :
   *  title: "Successful account creation"
   *  info: « If the user does not exist,
   *  the account is registered »
   */
  test("Successful account creation", async () => {
    const name: string = "name";
    const email: string = "email@example.com";
    const password: string = "password";
    const hashPassowrd: string = await hash(password, 12);

    // Arrange
    const params = {
      name,
      email,
      password,
    };

    const expected = {
      id: 1,
      name,
      email,
      password: hashPassowrd,
    };

    const getByEmail = (mockUserRepository.getByEmail = jest.fn());
    getByEmail.mockReturnValue(false);

    const createUser = (mockUserRepository.createUser = jest.fn());
    createUser.mockReturnValue(expected);

    const writeEmail = (mockEmailManagment.writeEmail = jest.fn());
    writeEmail.mockReturnValue(true);

    const sendEmail = (mockEmailManagment.sendEmail = jest.fn());
    sendEmail.mockReturnValue(true);

    // Act
    const response: any = await service.signUp(params);

    // Assert
    expect.objectContaining(response);
    expect(response.result).toEqual(expected);
  });
});
