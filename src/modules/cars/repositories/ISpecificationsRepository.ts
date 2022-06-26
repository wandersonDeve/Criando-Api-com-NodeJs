import { Specification } from "../infra/typeorm/entities/Specifications";

interface ISpecificationsDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ISpecificationsDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, ISpecificationsDTO };
