import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";

const createSpecificationsRepository = new SpecificationsRepository();

const createSpecificationUseCase = new CreateSpecificationsUseCase(
    createSpecificationsRepository
);

const createSpecificationController = new CreateSpecificationController(
    createSpecificationUseCase
);

export { createSpecificationController };
