import mockUserRepository from "./mock/user.mock";
import { mockRequest, mockResponse } from "jest-mock-req-res";
import { Request, Response } from "express";
import { hash } from "bcrypt";

import userService from "../services/user-service";
import userController from "../controllers/user-controller";
const service = userService(mockUserRepository);
const controller = userController(service);

afterEach(() => {
  jest.clearAllMocks();
});

describe("User Tests : ", () => {
  /**
   *  Test 1 :
   *  title: "SignIn Unauthorized"
   *  info: « If the user does not exist the
   *  connection is impossible »
   */
  test("SignIn Unauthorized", async () => {
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

// describe("User Tests : ", () => {
//   test("SignIn ok", async () => {
//     const email: string = "email@example.com";
//     const password: string = "password";
//     const hashPassowrd: string = await hash(password, 12);
//     // Arrange
//     const req = mockRequest({
//       params: {},
//       body: {
//         email,
//         password,
//       },
//     });

//     const getByEmail = (mockUserRepository.getByEmail = jest.fn());
//     getByEmail.mockReturnValue({
//       email,
//       password: hashPassowrd,
//       validation: true,
//     });

//     // Act
//     const response = await controller.signIn(req, mockResponse());
//     const res: any = mockResponse(response);

//     console.log("**********************************");
//     console.log(res.json);
//     console.log("**********************************");

//     // Assert
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toEqual({
//       email,
//       password: hashPassowrd,
//       validation: true,
//     });
//   });
// });

// describe("User Tests : ", () => {
//   test("SignIn ok", async () => {
//     let resObject = {};
//     const email: string = "email@example.com";
//     const password: string = "password";
//     const hashPassowrd: string = await hash(password, 12);
//     // Arrange
//     const req = {
//       params: {},
//       body: {
//         email,
//         password,
//       },
//     };

//     const res: Partial<Response> = {
//       json: jest.fn().mockImplementation((result) => {
//         console.log("******************************************");
//         console.log(result);
//         console.log("******************************************");
//         resObject = result;
//       }),
//     };

//     const getByEmail = (mockUserRepository.getByEmail = jest.fn());

//     getByEmail.mockReturnValue({
//       email,
//       password: hashPassowrd,
//       validation: true,
//     });

//     controller.signIn(req as Request, res as Response).then((response: any) => {
//       console.log(response);
//     });

//     console.log("+++++++++++++++++++++++++++");
//     console.log(res.json);
//     console.log("+++++++++++++++++++++++++++");

//     expect(true).toEqual(true);

//     // expect(res).toEqual({
//     //   email,
//     //   password: hashPassowrd,
//     //   validation: true,
//     // });
//   });
// });
