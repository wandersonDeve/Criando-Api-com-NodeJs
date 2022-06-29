import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/err/AppError";
import dayjs from "dayjs";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("CreateRentalUseCase", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
    );
  });

  it("should be defined", () => {
    expect(createRentalUseCase).toBeDefined();
  });

  it("should create a rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "user_id",
      car_id: "car_id",
      expected_return_date: dayAdd24Hours,
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not create a rental if car is unavailable", async () => {
    await createRentalUseCase.execute({
      user_id: "1",
      car_id: "10",
      expected_return_date: dayAdd24Hours,
    });
    await expect(
      createRentalUseCase.execute({
        user_id: "2",
        car_id: "10",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not create a rental if user already has an open rental", async () => {
    await createRentalUseCase.execute({
      user_id: "1",
      car_id: "10",
      expected_return_date: dayAdd24Hours,
    });
    await expect(
      createRentalUseCase.execute({
        user_id: "1",
        car_id: "11",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not create a rental if expected return date is less than 24 hours", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "1",
        car_id: "10",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
