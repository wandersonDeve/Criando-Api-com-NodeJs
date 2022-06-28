import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let uploadCarImagesUseCase: UploadCarImagesUseCase;

describe("UploadCarImageUseCase", () => {
  beforeEach(() => {
    uploadCarImagesUseCase = new UploadCarImagesUseCase();
  });

  it("should be defined", () => {
    expect(uploadCarImagesUseCase.execute()).toBeDefined();
  });
});
