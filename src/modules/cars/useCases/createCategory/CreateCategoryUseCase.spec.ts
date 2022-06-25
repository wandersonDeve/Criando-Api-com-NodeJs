import { AppError } from "../../../../err/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("CreateCategoryUseCase", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be defined", () => {
    expect(createCategoryUseCase).toBeDefined();
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Test",
      description: "Test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
    expect(categoryCreated.name).toBe("Test");
    expect(categoryCreated.description).toBe("Test");
  });

  it("should not be able to create a new category with name exists", async () => {
    expect(async () => {
      const category = {
        name: "Test",
        description: "Test",
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      const result = await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      const categoryCreated = await categoriesRepositoryInMemory.findByName(
        category.name
      );
    }).rejects.toBeInstanceOf(AppError)
  });
});
