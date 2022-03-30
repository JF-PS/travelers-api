import mockUserRepository from "../mock/user.mock";
import mockVehicleRepository from "../mock/vehicle.mock";
import mockAdRepository from "../mock/ad.mock";

import adService from "../../services/ad-service";
const service = adService(
  mockVehicleRepository,
  mockAdRepository,
  mockUserRepository
);

const vehicle: any = {
  category_id: 2,
  sub_category_id: 2,
  brand_id: 2,
  serial_number_id: 2,
  gas_id: 1,
  horsepower_id: 2,
  year: "2022-04-27 00:00:00.000 +0100",
  date_circulation: "2022-04-27 00:00:00.000 +0100",
  kilometers: 10000,
};

const ad: any = {
  user_id: 1,
  type_id: 1,
  address: "CCR Rives d'Arcins Rocade Sortie 20, 33130 Bègles",
  price: 5000,
  description:
    "Lorem ipsum dolor sit amet. Eum incidunt voluptatibus non enim tempore eos quam error. Qui commodi debitis non atque omnis sit nobis voluptatem sit voluptas velit. Id blanditiis quisquam est aspernatur quia aut sunt animi est enim quia. Qui voluptatum quaerat sed nesciunt autem aut perspiciatis earum At omnis atque.",
  title: "Fourgon pas chère.",
};

afterEach(() => {
  jest.clearAllMocks();
});

describe("AdService ==> Create Tests : ", () => {
  /**
   *  Test 1 :
   *  title: "User does not exist"
   *  info: « Can't create ad if user doesn't exist »
   */
  test("User does not exist", async () => {
    const expected = { errorMessage: "User doesn't exist" };

    const getById = (mockUserRepository.getById = jest.fn());
    getById.mockReturnValue(null);

    // Act
    const response: any = await service.create(vehicle, ad);

    // Assert
    expect.objectContaining(response);
    expect(response).toEqual(expected);
  });

  /**
   *  Test 2:
   *  title: "Account not validated"
   *  info: « Can't create ad if user not validate his account »
   */
  test("Account not validated", async () => {
    const expected = { errorMessage: "Your account is not yet validated" };

    const getById = (mockUserRepository.getById = jest.fn());
    getById.mockReturnValue({ validation: false });

    // Act
    const response: any = await service.create(vehicle, ad);

    // Assert
    expect.objectContaining(response);
    expect(response).toEqual(expected);
  });

  /**
   *  Test 3:
   *  title: "Create Vehicle Error"
   *  info: « Error server during vehicule creation »
   */
  test("Create Vehicle Error", async () => {
    const expected = {
      errorMessage: "An error occurred while creating the vehicle",
    };

    const getById = (mockUserRepository.getById = jest.fn());
    getById.mockReturnValue({ validation: true });

    const createVehicle = (mockVehicleRepository.create = jest.fn());
    createVehicle.mockReturnValue(false);

    // Act
    const response: any = await service.create(vehicle, ad);

    // Assert
    expect.objectContaining(response);
    expect(response).toEqual(expected);
  });

  /**
   *  Test 4:
   *  title: "Create Ad Error"
   *  info: « Error server during vehicule creation »
   */
  test("Create Ad Error", async () => {
    const expected = {
      errorMessage: "An error occurred while creating the ad",
    };

    const getById = (mockUserRepository.getById = jest.fn());
    getById.mockReturnValue({ validation: true });

    const createVehicle = (mockVehicleRepository.create = jest.fn());
    createVehicle.mockReturnValue(true);

    const createAd = (mockAdRepository.create = jest.fn());
    createAd.mockReturnValue(false);

    // Act
    const response: any = await service.create(vehicle, ad);

    // Assert
    expect.objectContaining(response);
    expect(response).toEqual(expected);
  });

  /**
   *  Test 5:
   *  title: "Create Ad OK"
   *  info: « The creation is ok,
   *  all the information is good »
   */
  test("Create Ad OK", async () => {
    const expected = true;

    const getById = (mockUserRepository.getById = jest.fn());
    getById.mockReturnValue({ validation: true });

    const createVehicle = (mockVehicleRepository.create = jest.fn());
    createVehicle.mockReturnValue(true);

    const createAd = (mockAdRepository.create = jest.fn());
    createAd.mockReturnValue(expected);

    // Act
    const response: any = await service.create(vehicle, ad);

    // Assert
    expect.objectContaining(response);
    expect(response.result).toEqual(expected);
  });
});
