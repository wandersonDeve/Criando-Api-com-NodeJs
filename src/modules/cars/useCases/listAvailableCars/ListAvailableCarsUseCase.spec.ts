import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListAvailableCarsUseCase;
let carMock = {};

describe("ListCarsUseCase", () => {
  beforeEach(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);

    carMock = await carsRepositoryInMemory.create({
      name: "Cybertruck",
      description: "Design futurista",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 100,
      brand: "Tesla",
      category_id: "category_id",
    });
  });

  it("should be defined", () => {
    expect(listCarsUseCase).toBeDefined();
  });

  it("should be able to list all available cars", async () => {
    const car = carMock;

    const availableCars = await listCarsUseCase.execute({});

    expect(availableCars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = carMock;

    const availableCars = await listCarsUseCase.execute({ brand: "Tesla" });

    expect(availableCars).toEqual([car]);
  });

  it("should not be able to list any car when brand not exists", async () => {
    const availableCars = await listCarsUseCase.execute({ brand: "Ford" });

    expect(availableCars).toEqual([]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = carMock;

    const availableCars = await listCarsUseCase.execute({
      category_id: "category_id",
    });

    expect(availableCars).toEqual([car]);
  });

  it("should not be able to list any car when category not exists", async () => {
    const availableCars = await listCarsUseCase.execute({
      category_id: "category_id_not_exists",
    });

    expect(availableCars).toEqual([]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = carMock;

    const availableCars = await listCarsUseCase.execute({ name: "Cybertruck" });

    expect(availableCars).toEqual([car]);
  });

  it("should not be able to list any car when name not exists", async () => {
    const availableCars = await listCarsUseCase.execute({ name: "Ford" });

    expect(availableCars).toEqual([]);
  });
});
