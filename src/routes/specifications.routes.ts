import { Router } from "express";
import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { CreateSpecificationsUseCase } from "../modules/cars/useCases/createSpecification/CreateSpecificationsUseCase";


const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const createSpecificationsService = new CreateSpecificationsUseCase(
    specificationsRepository
  );

  createSpecificationsService.execute({ name, description });

  return res.status(201).json({ message: "Specification created" });
});

export { specificationsRoutes };
