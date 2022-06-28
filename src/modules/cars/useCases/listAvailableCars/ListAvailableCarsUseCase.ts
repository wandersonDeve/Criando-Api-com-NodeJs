import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  name?: string;
  brand?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private readonly carsRepository: ICarsRepository
  ) {}

  async execute({ category_id, name, brand }: IRequest): Promise<Car[]> {
    return this.carsRepository.findAllAvailableCars(category_id, name, brand);
  }
}

export { ListAvailableCarsUseCase };
