import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";

class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createSpecificationsUseCase = container.resolve(CreateSpecificationsUseCase)

    await createSpecificationsUseCase.execute({ name, description });

    return res.status(201).json({ message: "Specification created" });
  }
}

export { CreateSpecificationController };
