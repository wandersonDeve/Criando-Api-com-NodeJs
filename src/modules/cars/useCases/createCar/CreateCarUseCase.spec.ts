import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/err/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createUseCase: CreateCarUseCase;

describe("CreateCarUseCase", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be defined", () => {
    expect(createUseCase).toBeDefined();
  });

  it("should be able to create a new cars", async () => {
    await createUseCase.execute({
      name: "Cybertruck",
      description: "Design futurista",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 100,
      brand: "Tesla",
      category_id: "category_id",
    });
  });

  it("should not be able to create a new cars with license plate already exists", async () => {
    await createUseCase.execute({
      name: "Cybertruck",
      description: "Design futurista",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 100,
      brand: "Tesla",
      category_id: "category_id",
    });

    await expect(
      createUseCase.execute({
        name: "Cybertruck",
        description: "Design futurista",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 100,
        brand: "Tesla",
        category_id: "category_id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new cars with a license plate with less than 7 characters", async () => {
    await expect(
      createUseCase.execute({
        name: "Cybertruck",
        description: "Design futurista",
        daily_rate: 100,
        license_plate: "ABC-123",
        fine_amount: 100,
        brand: "Tesla",
        category_id: "category_id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new cars with a license plate with more than 7 characters", async () => {
    await expect(
      createUseCase.execute({
        name: "Cybertruck",
        description: "Design futurista",
        daily_rate: 100,
        license_plate: "ABC-1234567",
        fine_amount: 100,
        brand: "Tesla",
        category_id: "category_id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be abre to create a car with available true by default", async () => {
    const car = await createUseCase.execute({
      name: "Cybertruck",
      description: "Design futurista",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 100,
      brand: "Tesla",
      category_id: "category_id",
    });

    expect(car.available).toBe(true);
  })


});
