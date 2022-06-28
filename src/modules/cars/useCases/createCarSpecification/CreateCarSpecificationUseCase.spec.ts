import { AppError } from "@shared/err/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("CreatecarSpecificationUseCase", () => {
  beforeEach(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should be defined", () => {
    expect(createCarSpecificationUseCase).toBeDefined();
  });

  it("should not be able to create a new relation between car specification when car not exists", async () => {
    expect(async () => {
      const car_id = "123";
      const specifications_id = ["980", "456"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a new car specification", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Cybertruck",
      description: "Design futurista",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 100,
      brand: "Tesla",
      category_id: "category_id",
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: "Design futurista",
      name: "Design futurista",
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
