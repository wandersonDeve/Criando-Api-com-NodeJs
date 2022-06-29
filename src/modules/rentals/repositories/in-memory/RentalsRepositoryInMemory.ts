import { ICreateRentalDTO } from "@modules/rentals/dtos/IcreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }
  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(
      rental,
      {
        start_date: new Date(),
      },
      data
    );

    this.rentals.push(rental);

    return rental;
  }
}

export { RentalsRepositoryInMemory };
