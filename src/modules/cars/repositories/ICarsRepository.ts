import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Cars";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  findAllAvailableCars(
    category_id?: string,
    name?: string,
    brand?: string
  ): Promise<Car[]>;
}

export { ICarsRepository };
