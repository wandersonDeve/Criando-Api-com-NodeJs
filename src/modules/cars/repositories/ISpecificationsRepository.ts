import { ISpecificationsDTO } from "../dtos/ISpecificationsDTO";
import { Specification } from "../infra/typeorm/entities/Specifications";

interface ISpecificationsRepository {
  create({ name, description }: ISpecificationsDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, ISpecificationsDTO };
