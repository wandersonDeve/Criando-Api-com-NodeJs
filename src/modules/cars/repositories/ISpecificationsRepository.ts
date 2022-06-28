import { ISpecificationsDTO } from "../dtos/ISpecificationsDTO";
import { Specification } from "../infra/typeorm/entities/Specifications";

interface ISpecificationsRepository {
  create({ name, description }: ISpecificationsDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository };
