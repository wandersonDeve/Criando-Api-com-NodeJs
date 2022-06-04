import { Specification } from "../entities/Specifications";

interface ISpecificationsDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ISpecificationsDTO): void;
  findByName(name: string): Specification;
}

export { ISpecificationsRepository, ISpecificationsDTO };
