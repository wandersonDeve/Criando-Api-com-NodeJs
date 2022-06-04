import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class ListCategoriesUseCase {
  constructor(private readonly categoryRepository: ICategoriesRepository) {}

  execute(): Category[] {
    const categories = this.categoryRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };
