import mockUserRepository from "../mock/user.mock";
import { mockRequest, mockResponse } from "jest-mock-req-res";
import { Request, Response } from "express";
import { hash } from "bcrypt";

import userService from "../../services/user-service";
const service = userService(mockUserRepository);

afterEach(() => {
  jest.clearAllMocks();
});

describe("UserService ==> SignIn Tests : ", () => {
  /**
   *  Test 1 :
   *  title: "User does not exist"
   *  info: « If the user does not exist the
   *  connection is impossible »
   */
  test("User does not exist", async () => {
    const email: string = "email@example.com";
    const password: string = "password";

    // Arrange
    const params = {
      email,
      password,
    };

    const expected = { errorMessage: "User doesn't exist" };

    const getByEmail = (mockUserRepository.getByEmail = jest.fn());
    getByEmail.mockReturnValue(null);

    // Act
    const response: any = await service.signIn(params);

    // Assert
    expect.objectContaining(response);
    expect(response).toEqual(expected);
  });

  /**
   *  Test 2 :
   *  title: "Account not yet validated"
   *  info: « If the account is not validated,
   *  the connection is refused »
   */
  test("Account not yet validated", async () => {
    const email: string = "email@example.com";
    const password: string = "password";
    const hashPassowrd: string = await hash(password, 12);

    // Arrange
    const params = {
      email,
      password,
    };

    const expected = { errorMessage: "Your account is not yet validate !" };

    const getByEmail = (mockUserRepository.getByEmail = jest.fn());
    getByEmail.mockReturnValue({
      email,
      password: hashPassowrd,
      validation: false,
    });

    // Act
    const response: any = await service.signIn(params);

    // Assert
    expect.objectContaining(response);
    expect(response).toEqual(expected);
  });

  /**
   *  Test 3 :
   *  title: "Incorrect password"
   *  info: « If the password is incorrect,
   *  the connection is refused. »
   */
  test("Incorrect password", async () => {
    const email: string = "email@example.com";
    const password: string = "bad-password";
    const hashPassowrd: string = await hash("password", 12);

    // Arrange
    const params = {
      email,
      password,
    };

    const expected = { errorMessage: "Incorrect password" };

    const getByEmail = (mockUserRepository.getByEmail = jest.fn());
    getByEmail.mockReturnValue({
      email,
      password: hashPassowrd,
      validation: true,
    });

    // Act
    const response: any = await service.signIn(params);

    // Assert
    expect.objectContaining(response);
    expect(response).toEqual(expected);
  });

  /**
   *  Test 4 :
   *  title: "SignIn ok"
   *  info: If the account has been validated,
   *  and the information is correct.
   *  The user can connect, and recover his token.
   */
  test("SignIn ok", async () => {
    const email: string = "email@example.com";
    const password: string = "password";
    const hashPassowrd: string = await hash(password, 12);
    // Arrange
    const params = {
      email,
      password,
    };
    const expected = {
      email,
      password: hashPassowrd,
      validation: true,
    };

    const getByEmail = (mockUserRepository.getByEmail = jest.fn());
    getByEmail.mockReturnValue(expected);

    // Act
    const response: any = await service.signIn(params);

    // Assert
    expect.objectContaining(response);
    expect(response.result).toEqual(expected);
    expect(response.token).not.toBeNull();
  });
});
