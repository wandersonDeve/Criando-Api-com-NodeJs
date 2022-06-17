import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";

class CreateSpecificationController {
  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    const createSpecificationsUseCase = container.resolve(CreateSpecificationsUseCase)

    createSpecificationsUseCase.execute({ name, description });

    return res.status(201).json({ message: "Specification created" });
  }
}

export { CreateSpecificationController };
