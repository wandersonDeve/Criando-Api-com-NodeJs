import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { specifications_id } = req.body;

    const createcarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const cars = await createcarSpecificationUseCase.execute({
      car_id: id,
      specifications_id,
    });

    return res.status(201).json(cars);
  }
}

export { CreateCarSpecificationController };
