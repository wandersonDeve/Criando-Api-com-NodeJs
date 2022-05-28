import { Request, Response } from "express";

import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";

class CreateSpecificationController {
  constructor(private specificationUseCase: CreateSpecificationsUseCase) {}

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    this.specificationUseCase.execute({ name, description });

    return res.status(201).json({ message: "Specification created" });
  }
}

export { CreateSpecificationController };
