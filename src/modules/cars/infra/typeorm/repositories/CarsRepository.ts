import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "../entities/Cars";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    license_plate,
    brand,
    category_id,
    daily_rate,
    fine_amount,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      license_plate,
      brand,
      category_id,
      daily_rate,
      fine_amount,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }

  async findAllAvailableCars(
    category_id?: string,
    name?: string,
    brand?: string
  ): Promise<Car[]> {
    const query = await this.repository
      .createQueryBuilder("car")
      .where("car.available = :available", { available: true });

    if (category_id) {
      query.andWhere("car.category_id = :category_id", { category_id });
    }

    if (name) {
      query.andWhere("car.name = :name", { name });
    }

    if (brand) {
      query.andWhere("car.brand = :brand", { brand });
    }

    const cars = await query.getMany();

    return cars;
  }
}

export { CarsRepository };
